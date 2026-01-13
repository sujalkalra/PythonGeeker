# PythonGeeker

A full-stack web application built with Python backend and modern frontend framework.

## 🚀 Project Structure

```
pythongeeker/
├── frontend/          # Frontend application (React/Next.js)
├── backend/           # Backend API (Python/FastAPI)
├── docker/            # Docker configuration files
├── docker-compose.yml # Docker Compose configuration
├── README.md          # Project documentation
└── .gitignore         # Git ignore rules
```

## 🛠️ Technologies

- **Backend**: Python, FastAPI/Flask, PostgreSQL
- **Frontend**: React/Next.js, TypeScript, Tailwind CSS
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose
- **Development**: Poetry/pip, npm/yarn

## 📦 Prerequisites

- Docker and Docker Compose
- Python 3.8+
- Node.js 14+

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pythongeeker
   ```

2. **Start with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the applications**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## 📁 Development Setup

### Backend Development

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Set up Python virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the development server:
   ```bash
   python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Development

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## 🐳 Docker Services

- **backend**: Python API service running on port 8000
- **frontend**: React/Next.js application running on port 3000
- **db**: PostgreSQL database running on port 5432

## 🔧 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://postgres:postgres@db:5432/pythongeeker
ENVIRONMENT=development
SECRET_KEY=your-secret-key
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8000
```

## 📊 Database

The application uses PostgreSQL with the following default credentials:
- Database: pythongeeker
- User: postgres
- Password: postgres
- Port: 5432

## 🧪 Testing

Run tests for both backend and frontend:

```bash
# Backend tests
cd backend && python -m pytest

# Frontend tests
cd frontend && npm test
```

## 📈 Deployment

### Production Build

```bash
docker-compose -f docker-compose.prod.yml up --build
```

### Kubernetes (Optional)

See `docker/kubernetes` directory for deployment manifests.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you have any questions or issues, please open an issue on GitHub or contact the development team.