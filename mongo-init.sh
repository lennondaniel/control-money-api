set -e

mongosh <<EOF

db = db.getSiblingDB('control-money')

db.createUser({
  user: 'user_control_money',
  pwd: 'secret',
  roles: [
    {
      role: 'dbOwner',
      db: 'control-money',
    },
  ],
})

EOF