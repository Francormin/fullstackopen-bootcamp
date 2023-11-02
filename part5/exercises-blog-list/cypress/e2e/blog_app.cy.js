describe("Blog app", function () {
  beforeEach(function () {
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
});
