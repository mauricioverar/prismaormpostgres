import { PrismaClient } from "@prisma/client" // importar prisma

const prisma = new PrismaClient() // db

// async function main() {}
const main = async () => {
  //prisma.user. metodos

  try {
    // crear user
    /* const newUser = await prisma.user.create({
      // campos
      data: {
        name: "tom",
        email: "tom@gmail.com",

        posts: { // relacion*
          create: {
            title: "mi 1ª publicacion",
            content: "mi primer post",
          },
        },
      },
    })
    console.log(newUser) */

    // ó

    // crear post
    const newPost = await prisma.post.create({ // relacion*
      // campos
      data: {
        title: "mi 2ª publicacion",
        // content: "mi primer post",
        // authorId: newUser.id // reference // pasando directamente el id del autor
        authorId: 8 // nuevo post para user 8
        /* author: {
          // o que conécte con una propiedad del autor
          connect: {
            id: newUser.id,
          },
        }, */
      },
    })
    console.log(newPost)

    /* const users = await prisma.user.findMany() // consultar todos los datos
  // console.log(users) // mostrar todos los registros de tabla user

  users.map(user => {
    console.log(`${user.id} - ${user.name}`) // 1 - mao, etc
  }) */

    // consultar un solo dato
    /* const user = await prisma.user.findFirst({
    where: {
      // id: 2,
      // name: 'mao'
      // email: 'mao@gmail.com'
      // OR cualquiera de estos id o email, el primero q encuentre, AND los 2 existan
      OR: [
        {id: 1},
        {email: 'mao@gmail.com'}
      ]
    }
  })
  console.log(user) */

    // eliminar user
    /* const user = await prisma.user.delete({
      where: {
        id: 1 // email, OR, etc 
      }
    }) */

    // actualizar user update o updateMany para varios con el mismo dato (count: 2)afect
    /* const user = await prisma.user.update({
      where: {
        // id: 3 // email, OR, etc 
        email: 'max@gmail.com'
      },
      data: {
        email: 'joe@gmail.com',
        name: 'joe'
      }
    }) */

    // upsert
    /* const user = await prisma.user.upsert({
      where: {
        // id: 3 // email, OR, etc 
        email: 'jon@gmail.com' // buscar email
      },
      create: { // sino existe crearlo
        email: 'jon@gmail.com',
        name: 'jon'
      },
      update: {
        lastname: 'carter' // actualizar apellido
      }
    })
    console.log(user) */
  } catch (error) {
    // console.log(error)
    console.log(error.message)
    console.log(error.meta)
    console.log(error.meta.cause)
    console.log(error.code)

    if (error.code === "P2025") {
      console.log("user not found")
    }
  }
  /* const users = await prisma.user.findMany()
  console.log(users) */

  /* const posts = await prisma.post.findMany()
  console.log(posts) */

  // mostrar todo y con relaciones
  const users = await prisma.user.findMany({ //  todos los q encuentre
    include: { // incluir relación con tabla post
      posts: true
    }
  })
  users.forEach(user => {
    console.log('-----')
    console.log(`User: ${user.name}`)
    console.log(`Email: ${user.email}`)

    user.posts.forEach((post, i) => { // agregar indice
      console.log(`${i}. ${post.title} ${post.content}`) //n de cada post de cada user
    })
  })
  // console.log(users)
}

main()
