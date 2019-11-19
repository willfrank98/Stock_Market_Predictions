sudo yum install -y python36.x86_64
sudo python3 -m pip install --upgrade pip
sudo python3 -m pip install -r requirements.txt
curl -sL https://rpm.nodesource.com/setup_12.x | sudo bash -
sudo yum install -y nodejs
cd static/
npm i
npm run build
cd ..
mkdir secrets
echo -e "SQLALCHEMY_DATABASE_URI = 'sqlite:////tmp/smpt.db'\nNYT_API = 'dNqKVxCzozGR5AWJXiXrLPZWwAMPBggs'\nDJI_API = '815438e6dcmsh77769002d11c1a5p121a4ajsn426ca3d155df'\nDB_KEY = '909104CDB5B06AF2606ED4A197B07D09D5EF9A4AAD97780C2FE48053BCE2BE52'" > secrets/secrets.py
