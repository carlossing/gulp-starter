

var regex = new RegExp('^([a-zA-ZÁ-Úá-úä-ü])+$');

QUnit.test("Test uppercase chars", function(assert) {

  assert.ok(true == regex.test('A'), "Passed!");
});
