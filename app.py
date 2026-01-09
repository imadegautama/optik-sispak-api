from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder='static')
CORS(app)

# 1. DATABASE PENGETAHUAN (KNOWLEDGE BASE) DENGAN CF
def inference_engine(fakta):
    # --- Penyakit: Glaukoma Akut (Darurat) ---
    if "G06" in fakta and "G14" in fakta and ("G08" in fakta or "G15" in fakta):
        return "Glaukoma Akut", "Darurat! Tekanan bola mata tinggi. Segera ke dokter mata.", 0.98

    # --- Penyakit: Ablasio Retina (Sangat Serius) ---
    if "G18" in fakta or ("G04" in fakta and "G10" in fakta):
        return "Ablasio Retina", "Sangat Serius! Gejala lepasnya retina. Segera ke IGD rumah sakit mata.", 0.99

    # --- Penyakit: Katarak ---
    if "G05" in fakta and ("G07" in fakta or "G08" in fakta):
        return "Katarak", "Lensa mata mengeruh. Konsultasikan mengenai kemungkinan operasi katarak.", 0.90

    # --- Penyakit: Konjungtivitis ---
    if "G01" in fakta and ("G17" in fakta or "G13" in fakta or "G02" in fakta):
        return "Konjungtivitis (Mata Merah)", "Infeksi atau alergi. Hindari mengucek mata dan gunakan tetes mata steril.", 0.85

    # --- Penyakit: Mata Kering ---
    if "G16" in fakta and "G11" in fakta:
        return "Dry Eye Syndrome", "Mata kering. Gunakan artificial tears dan istirahatkan mata dari layar.", 0.82

    # --- Catch-all: Iritasi Kompleks ---
    if len(fakta) >= 4:
        return "Iritasi Mata Kompleks", "Anda memiliki banyak gejala iritasi. Disarankan pemeriksaan fisik.", 0.60

    return "Diagnosis Tidak Spesifik", "Gejala belum mencukupi. Pilih minimal 2-3 gejala.", 0.0

# 2. ROUTE UNTUK FRONTEND
@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/style.css')
def serve_css():
    return send_from_directory('static', 'style.css')

@app.route('/script.js')
def serve_js():
    return send_from_directory('static', 'script.js')

# 3. API ENDPOINT (Update untuk mengembalikan CF)
@app.route('/diagnosa', methods=['POST'])
def diagnosa():
    data = request.get_json()
    gejala_user = data.get('gejala', [])
    # Menangkap 3 nilai return: hasil, saran, dan cf
    hasil, saran, cf = inference_engine(gejala_user)
    return jsonify({
        "diagnosis": hasil,
        "saran": saran,
        "confidence": cf  # Menambahkan field confidence di JSON
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)