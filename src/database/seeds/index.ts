import { getConnection, createConnection } from 'typeorm';
import { hash } from 'bcryptjs';
import Role from '../../models/Role';
import User from '../../models/User';


createConnection().then(async connection => {

  // // CREATE INITIAL ROLES
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

  const user = await getConnection().createQueryBuilder().select("user")
    .from(User, "user").where("user.name = :name", { name: "Admin" }).getOne();

  const roles = await getConnection().createQueryBuilder().select("roles")
    .from(Role, "roles").where("roles.name = :name", { name: "ROLE_ADMIN" }).getOne();


  // CREATE A RELATION BETWEEN ROLES AND USER FOR US HAVE ACCESS TO PROJECT
  // await getConnection()
  //   .createQueryBuilder()
  //   .relation(User, "roles")
  //   .of(user?.id)
  //   .add(roles?.id);

  await connection
    .createQueryBuilder()
    .relation(User, "roles")
    .of(user?.id) // posts
    .remove(roles?.id); // image


}).catch(error => console.log(error));
