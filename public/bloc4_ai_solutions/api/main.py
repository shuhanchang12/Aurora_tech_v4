from fastapi import FastAPI
from src.app import app as api_app

# This file can be used for WSGI/ASGI configurations, e.g., wrapping with metrics exporters.
app = api_app
