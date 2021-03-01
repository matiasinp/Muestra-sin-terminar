start cmd.exe @cmd /k setup_npm.cmd
py -m venv venv
.\venv\scripts\activate
pip install -r requirements.txt
cd backend
py manage.py runserver