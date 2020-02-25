const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');

const gateway = new ApolloGateway({
  serviceList: [
    { name: "users", url: "http://localhost:8001/graphql" },
    { name: "products", url: "http://localhost:8002/graphql" }
  ],
  __exposeQueryPlanExperimental: false,
});

(async () => {
  const server = new ApolloServer({
    gateway,
    engine: false,
    subscriptions: false
  });

  server.listen({ port: 8000 }).then(({url}) => {
    console.log(`Server is running at ${url}`);
  })
})();
