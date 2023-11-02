describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    const firstUser = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen"
    };

    const secondUser = {
      name: "John Doe",
      username: "johnny67",
      password: "awesomepass"
    };

    cy.request("POST", "http://localhost:3003/api/users", firstUser);
    cy.request("POST", "http://localhost:3003/api/users", secondUser);

    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.get("input[name='username']").should("exist");
    cy.get("input[name='password']").should("exist");
    cy.get("button[type='submit']").should("exist");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("input[name='username']").type("mluukkai");
      cy.get("input[name='password']").type("salainen");
      cy.get("button[type='submit']").click();

      cy.contains("Matti Luukkainen logged-in");
    });

    it("fails with wrong credentials", function () {
      cy.get("input[name='username']").type("mluukkai");
      cy.get("input[name='password']").type("wrong");
      cy.get("button[type='submit']").click();

      cy.contains("invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({
        username: "mluukkai",
        password: "salainen"
      });
    });

    it("a blog can be created", function () {
      cy.createBlogCypress({
        title: "test title",
        url: "test url"
      });

      cy.contains("test title");
      cy.contains("test url");
      cy.contains("Author: Matti Luukkainen");
    });

    it("a blog can be liked", function () {
      cy.createBlogCypress({
        title: "test title",
        url: "test url"
      });

      cy.get("button").contains("Like").click();
      cy.contains("Likes: 1");
    });

    it("a blog can be deleted", function () {
      cy.createBlogCypress({
        title: "test title",
        url: "test url"
      });

      cy.contains("Delete").click();
      cy.on("window:alert", alert => alert.accept());
      cy.contains("test title").should("not.exist");
      cy.contains("test url").should("not.exist");
    });

    it("users cannot delete blogs that do not own", function () {
      cy.contains("New blog").click();

      cy.get("form").within(() => {
        cy.get("input[name='title']").type("test title");
        cy.get("input[name='url']").type("test url");
        cy.get("button[type='submit']").click();
      });

      // Log in as a different user
      cy.login({
        username: "johnny67",
        password: "awesomepass"
      });

      // That user will not see the Delete button on other people's blogs
      cy.contains("View").click();
      cy.contains("Delete").should("not.exist");

      // Verify that the blog was not deleted
      cy.contains("test title").should("exist");
      cy.contains("test url").should("exist");
    });
  });
});
