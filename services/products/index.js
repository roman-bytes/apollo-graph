const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = gql`
  extend type Query {
    topProducts(first: Int = 5): [Product]
    products: [Product]!
  }

  type Product @key(fields: "upc") {
    upc: String!
    name: String
    price: Int
    weight: Int
  }
`;

const resolvers = {
  Product: {
    __resolveReference(object) {
      return products.find(product => product.upc === object.upc);
    }
  },
  Query: {
    topProducts(_, args) {
      return products.slice(0, args.first);
    },
    products() {
      return products;
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ])
});

server.listen({ port: 8002 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const products = [
  {
    upc: "1",
    name: "Cheeseburger",
    price: 8,
    weight: 7
  },
  {
    upc: "2",
    name: "Bacon",
    price: 1,
    weight: 1
  },
  {
    upc: "3",
    name: "Cheese",
    price: 1,
    weight: 2
  }
];
