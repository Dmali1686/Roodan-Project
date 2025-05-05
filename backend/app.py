from flask import Flask, request, jsonify, render_template, session, redirect, url_for, send_from_directory
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
from admin import record_loi_submission, record_enquiry, record_quotation, admin_bp, send_email, init_db

# Load environment variables
load_dotenv()

BASE_DIR = os.path.dirname(__file__)

app = Flask(__name__)

raw_origins = os.getenv(
    "FRONTEND_ORIGINS",
    "https://roodan.ae,https://www.roodan.ae"
)
allowed_origins = [o.strip() for o in raw_origins.split(",") if o.strip()]

# If you're running locally and want to test against localhost
if os.getenv("FLASK_ENV") == "development":
    allowed_origins += [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ]

# Configure CORS for the entire app with proper wildcard for all routes
CORS(app, resources={r"/api/*": {"origins": ["https://roodan.ae", "https://www.roodan.ae"]}})

# Configure Flask app
app.secret_key = os.getenv("SECRET_KEY", "your-secret-key-for-sessions")
app.config['SESSION_TYPE'] = 'filesystem'

# Register admin blueprint
app.register_blueprint(admin_bp, url_prefix='/admin')

# Initialize database
with app.app_context():
    init_db()

# Email configuration
EMAIL_HOST = os.getenv("SMTP_SERVER", "mail.roodan.ae")
EMAIL_PORT = int(os.getenv("SMTP_PORT", "465"))
EMAIL_USER = os.getenv("SMTP_USERNAME")
EMAIL_PASSWORD = os.getenv("SMTP_PASSWORD")
RECIPIENT_EMAIL = "test@roodan.ae"

# Function to Send Emails (renamed to send_email_notification to avoid conflict)
def send_email_notification(sender_email, subject, body):
    try:
        msg = MIMEMultipart()
        msg['From'] = EMAIL_USER  # Must use your verified sender email for SMTP
        msg['To'] = RECIPIENT_EMAIL
        msg['Reply-To'] = sender_email  # Sets user's email for reply
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))

        # Connect to SMTP server with SSL for security
        with smtplib.SMTP_SSL(EMAIL_HOST, EMAIL_PORT) as server:
            server.login(EMAIL_USER, EMAIL_PASSWORD)
            server.send_message(msg)

        print("✅ Email sent successfully!")
        return True
    except Exception as e:
        print(f"❌ Error sending email: {str(e)}")
        return False


@app.after_request
def add_cors_headers(response):
    origin = request.headers.get('Origin')
    if origin in allowed_origins:
        response.headers['Access-Control-Allow-Origin'] = origin
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response


@app.route('/')
def index():
    return render_template('admin_login.html')

@app.route('/contact', methods=['POST', 'OPTIONS'])
def contact():
    # Handle preflight requests
    if request.method == 'OPTIONS':
        response = app.make_response('')
        return response
    
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        if not all([name, email, message]):
            return jsonify({"error": "Missing required fields"}), 400

        if not record_enquiry(name, email, message):
            return jsonify({"error": "Failed to record enquiry"}), 500

        # Create HTML email with tables for better organization
        subject = "New Contact Form Submission"
        
        # Create HTML content with tables
        html_content = f"""
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; }}
                table {{ border-collapse: collapse; width: 100%; margin-bottom: 20px; }}
                th, td {{ border: 1px solid #ddd; padding: 8px; text-align: left; }}
                th {{ background-color: #f2f2f2; }}
                h2 {{ color: #333; }}
            </style>
        </head>
        <body>
            <h1>New Contact Form Submission</h1>
            
            <h2>Contact Information</h2>
            <table>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>{name}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{email}</td>
                </tr>
            </table>
            
            <h2>Message</h2>
            <table>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Message</td>
                    <td>{message}</td>
                </tr>
            </table>
        </body>
        </html>
        """
        
        # Create plain text version for email clients that don't support HTML
        plain_text = f"""
        New contact form submission received:
        
        Name: {name}
        Email: {email}
        Message: {message}
        """
        
        # Send HTML email
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = EMAIL_USER
        msg['To'] = RECIPIENT_EMAIL
        msg['Reply-To'] = email
        
        # Attach both plain text and HTML versions
        msg.attach(MIMEText(plain_text, 'plain'))
        msg.attach(MIMEText(html_content, 'html'))
        
        # Send the email
        try:
            with smtplib.SMTP_SSL(EMAIL_HOST, EMAIL_PORT) as server:
                server.login(EMAIL_USER, EMAIL_PASSWORD)
                server.send_message(msg)
            print("Email sent successfully")
        except Exception as e:
            print(f"Failed to send email: {str(e)}")
            # Continue anyway, as the submission was recorded

        return jsonify({"message": "Message sent successfully"}), 200
    except Exception as e:
        print(f"Error in contact endpoint: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/quote-request', methods=['POST'])
def quote_request():
    try:
        data = request.get_json()
        print("Received payload:", data)  # Debugging: Log the received payload

        # Map incoming keys to expected keys
        company = data.get('companyName', '')
        name = data.get('representativeName', '')
        email = data.get('email', '')
        phone = data.get('phone', '')
        product = data.get('productName', '')
        quantity = data.get('quantity', '')
        delivery = data.get('deliveryPort', '')
        observations = data.get('observations', '')
        payment_terms = data.get('paymentTerms', '')
        bank_name = data.get('bankName', '')
        bank_swift_code = data.get('bankSwiftCode', '')
        bank_address = data.get('bankAddress', '')
        account_name = data.get('accountName', '')
        account_number = data.get('accountNumber', '')
        bank_officer_name = data.get('bankOfficerName', '')
        bank_officer_title = data.get('bankOfficerTitle', '')
        bank_phone = data.get('bankPhone', '')

        # Record the quotation request and get ticket number
        ticket_no = record_quotation(company, name, email, phone, product, quantity, delivery, observations)
        if not ticket_no:
            return jsonify({"error": "Failed to record quotation request"}), 500

        # Create email content
        subject = f"New Quote Request - Ticket #{ticket_no}"

        # HTML content with separate tables for each section
        html_content = f"""
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; }}
                table {{ border-collapse: collapse; width: 100%; margin-bottom: 20px; }}
                th, td {{ border: 1px solid #ddd; padding: 8px; text-align: left; }}
                th {{ background-color: #f2f2f2; }}
                h2 {{ color: #333; }}
            </style>
        </head>
        <body>
            <h1>New Quote Request Received</h1>
            
            <h2>Buyer Information</h2>
            <table>
                <tr><th>Field</th><th>Value</th></tr>
                <tr><td>Company Name</td><td>{company or 'N/A'}</td></tr>
                <tr><td>Representative Name</td><td>{name or 'N/A'}</td></tr>
                <tr><td>Email</td><td>{email or 'N/A'}</td></tr>
                <tr><td>Phone</td><td>{phone or 'N/A'}</td></tr>
            </table>
            
            <h2>Product Details</h2>
            <table>
                <tr><th>Field</th><th>Value</th></tr>
                <tr><td>Product</td><td>{product or 'N/A'}</td></tr>
                <tr><td>Quantity</td><td>{quantity or 'N/A'}</td></tr>
                <tr><td>Delivery Port</td><td>{delivery or 'N/A'}</td></tr>
                <tr><td>Observations</td><td>{observations or 'N/A'}</td></tr>
            </table>
            
            <h2>Payment Details</h2>
            <table>
                <tr><th>Field</th><th>Value</th></tr>
                <tr><td>Payment Terms</td><td>{payment_terms or 'N/A'}</td></tr>
            </table>
            
            <h2>Buyer Bank Information</h2>
            <table>
                <tr><th>Field</th><th>Value</th></tr>
                <tr><td>Bank Name</td><td>{bank_name or 'N/A'}</td></tr>
                <tr><td>Bank SWIFT Code</td><td>{bank_swift_code or 'N/A'}</td></tr>
                <tr><td>Bank Address</td><td>{bank_address or 'N/A'}</td></tr>
                <tr><td>Account Name</td><td>{account_name or 'N/A'}</td></tr>
                <tr><td>Account Number</td><td>{account_number or 'N/A'}</td></tr>
                <tr><td>Bank Officer Name</td><td>{bank_officer_name or 'N/A'}</td></tr>
                <tr><td>Bank Officer Title</td><td>{bank_officer_title or 'N/A'}</td></tr>
                <tr><td>Bank Phone</td><td>{bank_phone or 'N/A'}</td></tr>
            </table>
        </body>
        </html>
        """

        # Plain text content
        plain_text = f"""
        New Quote Request Received:

        Buyer Information:
        - Company Name: {company or 'N/A'}
        - Representative Name: {name or 'N/A'}
        - Email: {email or 'N/A'}
        - Phone: {phone or 'N/A'}

        Product Details:
        - Product: {product or 'N/A'}
        - Quantity: {quantity or 'N/A'}
        - Delivery Port: {delivery or 'N/A'}
        - Observations: {observations or 'N/A'}

        Payment Details:
        - Payment Terms: {payment_terms or 'N/A'}

        Buyer Bank Information:
        - Bank Name: {bank_name or 'N/A'}
        - Bank SWIFT Code: {bank_swift_code or 'N/A'}
        - Bank Address: {bank_address or 'N/A'}
        - Account Name: {account_name or 'N/A'}
        - Account Number: {account_number or 'N/A'}
        - Bank Officer Name: {bank_officer_name or 'N/A'}
        - Bank Officer Title: {bank_officer_title or 'N/A'}
        - Bank Phone: {bank_phone or 'N/A'}
        """

        # Send HTML email
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = EMAIL_USER
        msg['To'] = RECIPIENT_EMAIL
        msg['Reply-To'] = email

        # Attach both plain text and HTML versions
        msg.attach(MIMEText(plain_text, 'plain'))
        msg.attach(MIMEText(html_content, 'html'))

        # Send the email
        try:
            with smtplib.SMTP_SSL(EMAIL_HOST, EMAIL_PORT) as server:
                server.login(EMAIL_USER, EMAIL_PASSWORD)
                server.send_message(msg)
            print("Email sent successfully")
        except Exception as e:
            print(f"Failed to send email: {str(e)}")
            return jsonify({"error": "Failed to send email"}), 500

        return jsonify({
            "message": "Quote request submitted successfully",
            "ticket_no": ticket_no
        }), 200
    except Exception as e:
        print(f"Error in quote request: {str(e)}")
        return jsonify({"error": str(e)}), 500

# @app.route('/loi-submission', methods=['POST'])
# def loi_submission():
#     try:
#         data = request.get_json()
#         print("Received LOI submission payload:", data)  # Debugging: Log the payload

#         # Extract user details from the payload
#         company_name = data.get('companyName')
#         rep_name = data.get('representativeName')
#         email = data.get('email')
#         phone = data.get('phone')
#         product = data.get('productName')
#         quantity = data.get('quantity')
#         loi_data = data  # Store the entire payload as JSON for future reference

#         # Record the LOI submission in the database
#         success = record_loi_submission(company_name, rep_name, email, phone, product, quantity, loi_data)
#         if not success:
#             return jsonify({"error": "Failed to record LOI submission"}), 500

#         # Create email content in table format
#         subject = f"New LOI Submission from {company_name}"
#         html_content = f"""
#         <html>
#         <head>
#             <style>
#                 body {{ font-family: Arial, sans-serif; }}
#                 table {{ border-collapse: collapse; width: 100%; margin-bottom: 20px; }}
#                 th, td {{ border: 1px solid #ddd; padding: 8px; text-align: left; }}
#                 th {{ background-color: #f2f2f2; }}
#                 h2 {{ color: #333; }}
#             </style>
#         </head>
#         <body>
#             <h1>New LOI Submission Received</h1>
            
#             <h2>Company Information</h2>
#             <table>
#                 <tr><th>Field</th><th>Value</th></tr>
#                 <tr><td>Company Name</td><td>{company_name}</td></tr>
#                 <tr><td>Representative Name</td><td>{rep_name}</td></tr>
#                 <tr><td>Email</td><td>{email}</td></tr>
#                 <tr><td>Phone</td><td>{phone}</td></tr>
#                 <tr><td>Product</td><td>{product}</td></tr>
#                 <tr><td>Quantity</td><td>{quantity}</td></tr>
#             </table>
            
#             <h2>Bank Information</h2>
#             <table>
#                 <tr><th>Field</th><th>Value</th></tr>
#                 <tr><td>Bank Name</td><td>{data.get('bankName', 'N/A')}</td></tr>
#                 <tr><td>Bank SWIFT Code</td><td>{data.get('bankSwiftCode', 'N/A')}</td></tr>
#                 <tr><td>Bank Address</td><td>{data.get('bankAddress', 'N/A')}</td></tr>
#                 <tr><td>Account Name</td><td>{data.get('accountName', 'N/A')}</td></tr>
#                 <tr><td>Account Number</td><td>{data.get('accountNumber', 'N/A')}</td></tr>
#                 <tr><td>Bank Officer Name</td><td>{data.get('bankOfficerName', 'N/A')}</td></tr>
#                 <tr><td>Bank Officer Title</td><td>{data.get('bankOfficerTitle', 'N/A')}</td></tr>
#                 <tr><td>Bank Phone</td><td>{data.get('bankPhone', 'N/A')}</td></tr>
#             </table>
            
#             <h2>Additional Information</h2>
#             <table>
#                 <tr><th>Field</th><th>Value</th></tr>
#                 <tr><td>Observations</td><td>{data.get('observations', 'N/A')}</td></tr>
#                 <tr><td>Specifications</td><td>{data.get('specifications', 'N/A')}</td></tr>
#             </table>
#         </body>
#         </html>
#         """

#         # Send the email
#         email_sent = send_email(email, subject, html_content)
#         if not email_sent:
#             return jsonify({"error": "Failed to send email"}), 500

#         return jsonify({"message": "LOI submission recorded successfully"}), 200
#     except Exception as e:
#         print(f"Error in LOI submission: {str(e)}")
#         return jsonify({"error": str(e)}), 500

# Admin redirect
@app.route('/admin', methods=['GET'])
def admin_redirect():
    return redirect(url_for('admin.login'))

# if _name_ == '_main_':
#     app.run(debug=True, port=5001)