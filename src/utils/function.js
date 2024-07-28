export async function makeItResponsive() {
  const cocktail = await import("../app/cocktail");
  cocktail.makeAppResponsive("main");
}
