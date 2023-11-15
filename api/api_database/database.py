""" database.py

Created on March 15 2023 by Florian Pfleiderer

Copyright (c) 2023 MIT License
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

TESTING = False
SQL_DATABASE_URL = 'sqlite:///api_db.db' if not TESTING else 'sqlite:///test.db'

engine = create_engine(SQL_DATABASE_URL, connect_args={'check_same_thread': False})

Sessionlocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
