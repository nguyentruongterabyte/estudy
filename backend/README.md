# Init node js server
```npm init  ```
# Nghiên cứu về Express

# Docker
```docker build -t truongchiller/english_app:0.0.1.RELEASE . ```
```docker container run -d -p 5000:5001 truongchiller/english_app:0.0.1.RELEASE  ```
```docker container ls ```
```docker container stop 693 ```
```docker push truongchiller/english_app:0.0.1.RELEASE ```

# Migrations

## Create a model
`npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string`

## Running Migrations database
```npx sequelize-cli db:migrate```

## Undoing Migrations
You can use `db:migrate:undo`, this command will revert the most recent migration.
`npx sequelize-cli db:migrate:undo`
You can revert back to the initial state by undoing all migrations with the `db:migrate:undo:all` command. You can also revert back to a specific migration by passing its name with the `--to` option.
`npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js`
## Running Seeds
`npx sequelize-cli db:seed:all`