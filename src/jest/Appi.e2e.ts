import { Selector } from "testcafe";
import { ReactSelector } from "testcafe-react-selectors";
import { waitForReact } from "testcafe-react-selectors";

fixture`HEADER`.page("http://localhost:3000");

test("App launch and add element ", async (t) => {
  // const App = ReactSelector("App");
  const buttonDialog = Selector("button").withAttribute("data-test-id", "open");

  const buttonAddUpdate = Selector("button").withAttribute(
    "data-test-id",
    "buttonAddUpdate"
  );

  const textContent = Selector("h2").withAttribute("data-testid", "dialogBox");
  const age = Selector("div").withAttribute("data-test-id", "age");
  const athlete = Selector("div").withAttribute("data-test-id", "athlete");
  const bronze = Selector("div").withAttribute("data-test-id", "bronze");
  const country = Selector("div").withAttribute("data-test-id", "country");
  const gold = Selector("div").withAttribute("data-test-id", "gold");
  const silver = Selector("div").withAttribute("data-test-id", "silver");
  const sport = Selector("div").withAttribute("data-test-id", "sport");
  const total = Selector("div").withAttribute("data-test-id", "total");
  const year = Selector("div").withAttribute("data-test-id", "year");
  // const actual = await App.withExactText("OPEN FORM DIALOG TO ADD DATA")
  //   .innerText;
  const expected = "OPEN FORM DIALOG TO ADD DATA";
  const details = "Details to be added";

  await t.expect(buttonDialog.innerText).contains(expected);
  await t.click(buttonDialog);
  await t.expect(textContent.innerText).contains(details);

  await t.expect(buttonAddUpdate.hasAttribute("disabled")).ok();
  await t.typeText(athlete, "micheal");
  await t.wait(100);
  await t.typeText(age, "13");
  await t.typeText(country, "1234");
  await t.typeText(year, "2021");
  await t.wait(100);
  await t.typeText(sport, "swimming");
  await t.wait(100);
  await t.typeText(gold, "2");
  await t.wait(100);
  await t.typeText(silver, "1");
  await t.typeText(bronze, "3");
  await t.wait(100);
  await t.typeText(total, "6");
  await t.wait(1000);
  await t.expect(buttonAddUpdate.hasAttribute("disabled")).notOk();
  await t.click(buttonAddUpdate);

  await t.wait(2000);
});

test("Update functionality", async (t) => {
  const buttonDialogUpdate = Selector("button").withAttribute(
    "data-test-id",
    "buttonDialogUpdate"
  );
  const textContent = Selector("h2").withAttribute("data-testid", "dialogBox");
  const athlete = Selector("div").withAttribute("data-test-id", "athlete");
  const buttonAddUpdate = Selector("button").withAttribute(
    "data-test-id",
    "buttonAddUpdate"
  );
  const sport = Selector("div").withAttribute("data-test-id", "sport");

  await t.expect(buttonDialogUpdate.hasAttribute("disabled")).notOk();
  await t.click(buttonDialogUpdate);
  await t.wait(1000);
  await t.expect(textContent.innerText).contains("Update");
  await t.typeText(athlete, `Shre${Math.floor(Math.random() * 100)}`, {
    replace: true,
  });
  await t.typeText(sport, `${Math.floor(Math.random() * 100)}`, {
    replace: true,
  });

  await t.click(buttonAddUpdate);
  await t.wait(3000);
});

test("Filter functionality", async (t) => {
  const textValue = Selector("div")
    .withAttribute("class", "ag-center-cols-container")
    .child(0)
    .child(0);
  await t.rightClick(textValue);
  await t.wait(2000);

  const filterElement = Selector("span").withExactText("Filter");
  await t.wait(1000);

  await t.click(filterElement);
  await t.wait(1000);
});

test("Delete functionality", async (t) => {
  const buttonDialogUpdate = Selector("button").withAttribute(
    "data-test-id",
    "buttonDialogUpdate"
  );
  const deleteContent = Selector("button").withAttribute(
    "data-test-id",
    "delete"
  );

  await t.rightClick(buttonDialogUpdate);
  const deletedailog = Selector("span").withExactText("Delete");
  await t.click(deletedailog);

  await t.wait(2000);
  await t.click(deleteContent);
  await t.wait(3000);
});
