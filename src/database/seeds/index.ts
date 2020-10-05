import { getConnection, createConnection } from 'typeorm';
import { hash } from 'bcryptjs';
import Role from '../../models/Role';
import User from '../../models/User';

// The code below it will run everytime you deploy it and when you execute yarn dev or yarn start, so if you dont want to execute this queries keep them commented

createConnection().then(async connection => {
  // Delete all users
  // await getConnection()
  //   .createQueryBuilder()
  //   .delete()
  //   .from(User)
  //   .where("username = :name", { name: "Admin" })
  //   .execute();

  //await getConnection()
  //  .createQueryBuilder()
  //  .delete()
  //  .from(Role)
  //  .where("created_at > :date", { date: "2020-10-04" })
  //  .execute();

  // CREATE INITIAL ROLES
  // await getConnection()
  //   .createQueryBuilder()
  //   .insert()
  //   .into(Role)
  //   .values([
  //     { name: "ROLE_USER", description: "User" },
  //     { name: "ROLE_ADMIN", description: "Administrator" },
  //   ])
  //   .execute();

  // // CREATE A ADMIN USER
  // await getConnection()
  //   .createQueryBuilder()
  //   .insert()
  //   .into(User)
  //   .values([
  //     { name: "Admin", username: "Admin", password: await hash('12345', 8) },
  //   ])
  //   .execute();

  // const user = await getConnection().createQueryBuilder().select("user")
  //   .from(User, "user").where("user.name = :name", { name: "Admin" }).getOne();

  // const roles = await getConnection().createQueryBuilder().select("roles")
  //   .from(Role, "roles").where("roles.name = :name", { name: "ROLE_ADMIN" }).getOne();


  // CREATE A RELATION BETWEEN ROLES AND USER FOR US HAVE ACCESS TO PROJECT
  // await getConnection()
  //   .createQueryBuilder()
  //   .relation(User, "roles")
  //   .of(user?.id)
  //   .add(roles?.id);

  // DELETE THE DATA FROM TABLE USERS_ROLES 
  // await connection
  //   .createQueryBuilder()
  //   .relation(User, "roles")
  //   .of(user?.id) // users
  //   .remove(roles?.id); // roles


}).catch(error => console.log(error));
