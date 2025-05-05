from flask import Blueprint, jsonify, render_template, request, session, redirect, url_for
import mysql.connector
import os
import datetime
import uuid
from functools import wraps
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

admin_bp = Blueprint('admin', _name_)

def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv('MYSQL_HOST'),
        user=os.getenv('MYSQL_USER'),
        password=os.getenv('MYSQL_PASSWORD'),
        database=os.getenv('MYSQL_DB'),
        autocommit=False
    )

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()  # Use a regular cursor, not a dictionary cursor

    # Create tables with MySQL-compatible schema
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        message TEXT,
        ticket_no VARCHAR(50) UNIQUE,
        expires_at DATETIME,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS quotations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ticket_no VARCHAR(50) UNIQUE,
        company VARCHAR(255),
        name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50),
        product VARCHAR(255),
        quantity VARCHAR(50),
        delivery VARCHAR(255),
        message TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        expires_at DATETIME
    )
    ''')
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS loi_submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        company_name VARCHAR(255),
        rep_name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50),
        product VARCHAR(255),
        quantity VARCHAR(50),
        submission_date DATETIME,
        loi_data TEXT
    )
    ''')
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    )
    ''')
    
    cursor.execute("SELECT COUNT(*) FROM admin_users")
    if cursor.fetchone()[0] == 0:  # This now works with a regular cursor
        cursor.execute("INSERT INTO admin_users (username, password) VALUES (%s, %s)", 
                      ("admin", "password123"))
    
    conn.commit()
    conn.close()

def record_enquiry(name, email, message):
    """Record a contact form enquiry"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        date_prefix = datetime.datetime.now().strftime('%Y%m%d')
        ticket_no = f"ENQ-{date_prefix}-{str(uuid.uuid4())[:5].upper()}"
        expires_at = datetime.datetime.now() + datetime.timedelta(days=30)
        
        cursor.execute(
            """INSERT INTO enquiries 
            (name, email, message, ticket_no, expires_at)
            VALUES (%s, %s, %s, %s, %s)""",
            (name, email, message, ticket_no, expires_at)
        )
        
        conn.commit()
        return True
    except Exception as e:
        print(f"Error recording enquiry: {str(e)}")
        return False
    finally:
        if conn.is_connected():
            conn.close()

def record_loi_submission(company_name, rep_name, email, phone, product, quantity, loi_data):
    """Record an LOI submission"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO loi_submissions 
            (company_name, rep_name, email, phone, product, quantity, submission_date, loi_data)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        ''', (company_name, rep_name, email, phone, product, quantity, 
             datetime.datetime.now(), str(loi_data)))
        
        conn.commit()
        return True
    except Exception as e:
        print(f"Error recording LOI submission: {str(e)}")
        return False
    finally:
        if conn.is_connected():
            conn.close()

def record_quotation(company, name, email, phone, product, quantity, delivery, message):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        date_prefix = datetime.datetime.now().strftime('%Y%m%d')
        ticket_no = f"QUOTE-{date_prefix}-{str(uuid.uuid4())[:5].upper()}"
        expires_at = datetime.datetime.now() + datetime.timedelta(days=7)
        
        cursor.execute(
            """INSERT INTO quotations 
            (ticket_no, company, name, email, phone, product, quantity, delivery, message, expires_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
            (ticket_no, company, name, email, phone, product, quantity, delivery, message, expires_at)
        )
        
        conn.commit()
        return ticket_no
    except Exception as e:
        print(f"Error recording quotation: {str(e)}")
        return None
    finally:
        if conn.is_connected():
            conn.close()

# Function to clean up expired quotations
def cleanup_expired_quotations():
    """Remove quotations that have expired"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        now = datetime.datetime.now()
        # Changed ? to %s for MySQL compatibility
        cursor.execute("DELETE FROM quotations WHERE expires_at < %s", (now,))
        
        deleted_count = cursor.rowcount
        conn.commit()
        conn.close()
        
        return deleted_count
    except Exception as e:
        print(f"Error cleaning up expired quotations: {str(e)}")
        return 0

# Login required decorator
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'admin_logged_in' not in session or not session['admin_logged_in']:
            return redirect(url_for('admin.login', next=request.url))
        return f(*args, **kwargs)
    return decorated_function

# Admin routes
@admin_bp.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        # Use %s placeholders for MySQL instead of ? (which is for SQLite)
        cursor.execute("SELECT * FROM admin_users WHERE username = %s AND password = %s", 
                      (username, password))
        user = cursor.fetchone()
        conn.close()
        
        if user:
            session['admin_logged_in'] = True
            session['admin_username'] = username
            return redirect(url_for('admin.dashboard'))
        else:
            error = 'Invalid credentials. Please try again.'
    
    return render_template('admin_login.html', error=error)

@admin_bp.route('/logout')
def logout():
    session.pop('admin_logged_in', None)
    session.pop('admin_username', None)
    return redirect(url_for('admin.login'))

@admin_bp.route('/dashboard')
@login_required
def dashboard():
    return render_template('admin_dashboard.html')

@admin_bp.route('/api/stats')
@login_required
def get_stats():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Get total enquiries
    cursor.execute("SELECT COUNT(*) FROM enquiries")
    total_enquiries = cursor.fetchone()[0]
    
    # Get total quotations
    cursor.execute("SELECT COUNT(*) FROM quotations")
    total_quotations = cursor.fetchone()[0]
    
    # Get total LOI submissions
    cursor.execute("SELECT COUNT(*) FROM loi_submissions")
    total_lois = cursor.fetchone()[0]
    
    conn.close()
    
    return jsonify({
        'total_enquiries': total_enquiries,
        'total_quotations': total_quotations,
        'total_lois': total_lois
    })

# Add new route for LOI submissions
@admin_bp.route('/api/loi-submissions')
@login_required
def get_loi_submissions():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)  # Use dictionary cursor here
    
    cursor.execute("SELECT * FROM loi_submissions ORDER BY submission_date DESC LIMIT 50")
    submissions = cursor.fetchall()  # Already returns dictionaries
    
    conn.close()
    
    return jsonify(submissions)

# Routes to view detailed data
@admin_bp.route('/api/enquiries', methods=['GET'])
@login_required  # Added login_required decorator
def get_enquiries():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)  # Use dictionary cursor
        
        cursor.execute("SELECT * FROM enquiries ORDER BY timestamp DESC")
        enquiries = cursor.fetchall()
        
        conn.close()
        return jsonify(enquiries), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_bp.route('/api/quotations', methods=['GET'])
@login_required  # Added login_required decorator
def get_quotations():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)  # Use dictionary cursor
        
        # Clean up expired quotations first
        cleanup_expired_quotations()
        
        # Fetch all quotations
        cursor.execute("SELECT * FROM quotations ORDER BY timestamp DESC")
        quotations = cursor.fetchall()
        
        conn.close()
        return jsonify(quotations), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# This route is duplicated, keeping it for backward compatibility
@admin_bp.route('/api/quotations')
@login_required
def get_quotations_admin():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)  # Use dictionary cursor
    
    # Clean up expired quotations first
    cleanup_expired_quotations()
    
    # Get active quotations
    cursor.execute("SELECT * FROM quotations ORDER BY timestamp DESC LIMIT 50")
    quotations = cursor.fetchall()
    
    conn.close()
    
    return jsonify(quotations)

# Keep the existing route for backward compatibility but mark it as deprecated
@admin_bp.route('/api/quotations/search/<int:ticket_no>', methods=['GET'])
@login_required
def search_quotation_by_id(ticket_no):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        # Changed ? to %s for MySQL compatibility
        cursor.execute("SELECT * FROM quotations WHERE id = %s", (ticket_no,))
        quotation = cursor.fetchone()
        
        conn.close()
        
        if quotation:
            return jsonify(quotation), 200
        else:
            return jsonify({"error": "Quotation not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Add new route to search by ticket number
@admin_bp.route('/api/quotations/search/ticket/<ticket_no>', methods=['GET'])
@login_required
def search_quotation(ticket_no):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        # Search by ticket_no field
        cursor.execute("SELECT * FROM quotations WHERE ticket_no = %s", (ticket_no,))
        quotation = cursor.fetchone()
        
        conn.close()
        
        if quotation:
            return jsonify(quotation), 200
        else:
            return jsonify({"error": "Quotation not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Email configuration
def send_email(to_email, subject, html_content):
    """Send an email using SMTP with HTML content"""
    try:
        smtp_server = os.getenv('SMTP_SERVER')
        smtp_port = int(os.getenv('SMTP_PORT', 587))
        smtp_username = os.getenv('SMTP_USERNAME')
        smtp_password = os.getenv('SMTP_PASSWORD')
        from_email = os.getenv('FROM_EMAIL')
        
        # Create message
        msg = MIMEMultipart('alternative')
        msg['From'] = from_email
        msg['To'] = to_email
        msg['Subject'] = subject
        
        # Attach HTML content
        msg.attach(MIMEText(html_content, 'html'))
        
        # Send email
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_username, smtp_password)
            server.send_message(msg)
        
        print("✅ Email sent successfully!")
        return True
    except Exception as e:
        print(f"❌ Error sending email: {str(e)}")
        return False