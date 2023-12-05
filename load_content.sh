#!/bin/bash
git pull
python load_content.py
git add .
git commit -m "upload by adrianah"
git push
