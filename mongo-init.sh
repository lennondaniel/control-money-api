set -e

mongosh <<EOF

db = db.getSiblingDB('control-money')

db.createUser({
  user: 'mongo_user',
  pwd: 'secret',
  roles: [
    {
      role: 'dbOwner',
      db: 'control-money',
    },
  ],
})

EOF