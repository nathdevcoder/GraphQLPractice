const chai = require("chai");
const chaiGraphQL = require("chai-graphql");
const { createTestServerWithMock } = require("./helper");
const typeDefs = require("../dist/Controller/TypeDefs/index").default;
const resolvers = require("../dist/Controller/Resolvers/index").default;

chai.use(chaiGraphQL);

const assert = chai.assert;

describe("My Files Testing", () => { 
  it("Should Query the My Files data with Folders and Files", async () => {
    const query = `#graphql
    query Getmyfiles($getmyfilesId: String) {
        getmyfiles(id: $getmyfilesId) {
          uploadedBy
          updatedAt
          rootFolder
          name
          index
          id
          deletedBy
          deletedAt
          accessibility
          ... on Folder {
            folders {
              name
            }
            files {
              fileName
            }
          }
          ... on File {
            url
            disk
            bucket
            thumbnailUrl
            fileSize
          }
        }
      }`;
    const variables = {
        getmyfilesId: "hello" 
    }
    const response = await createTestServerWithMock({
      typeDefs,
      resolvers,
      query,
      variables,
    });
    assert.notGraphQLError(response.body.singleResult);
  });  
  it("Should Add new Folder", async () => {
    const query = `#graphql
    mutation Addfolder($input: FolderInput) {
        addfolder(input: $input) {
          id
          uploadedBy
          deletedBy
          createdAt
          updatedAt
          deletedAt
          rootFolder
          name
          accessibility
          index
          files {
            id
          }
          folders {
            id
          }
          openedFolder {
            id
          }
        }
      }`;
    const variables = {
        input: {
            name: "hello world",
            index: 3,
            rootFolder: "root"
        }
    }
    const response = await createTestServerWithMock({
      typeDefs,
      resolvers,
      query,
      variables,
    });
    assert.notGraphQLError(response.body.singleResult);
  }); 
  it("Should Add new Files", async () => {
    const query = `#graphql
    mutation Addfile($input: FileInput) {
        addfile(input: $input) {
          id
          uploadedBy
          deletedBy
          createdAt
          updatedAt
          deletedAt
          rootFolder
          name
          accessibility
          index
          fileName
          fileSize
          fileType
          filePath
          disk
          url
          bucket
          thumbnailUrl
        }
      }`;
    const variables = {
        input: {
            file: "test",
            index: 4
        }
    }
    const response = await createTestServerWithMock({
      typeDefs,
      resolvers,
      query,
      variables,
    });
    assert.notGraphQLError(response.body.singleResult);
  });
});
