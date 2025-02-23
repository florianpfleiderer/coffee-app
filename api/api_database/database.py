""" database.py

Created on March 15 2023 by Florian Pfleiderer

Copyright (c) 2023 MIT License
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

TESTING = False

# Use absolute path that works in Docker
DB_PATH = "/app/api_database/api_db.db"

SQL_DATABASE_URL = f'sqlite:///{DB_PATH}' if not TESTING else 'sqlite:///test.db'

engine = create_engine(SQL_DATABASE_URL, connect_args={'check_same_thread': False})

Sessionlocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
