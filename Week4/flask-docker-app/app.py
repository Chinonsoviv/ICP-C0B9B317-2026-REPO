from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return '''
    <h1>Hello from Docker!</h1>
    <p>This Python Flask app is running inside a Docker container.</p>
    <p>Built by Chinonso Vivian Ojeri</p>
    <p>InternCareerPath DevOps Internship 2026</p>
    '''

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)