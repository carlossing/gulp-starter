

var regex = new RegExp('^([0-9a-zA-ZÁ-Úá-úä-ü.,\\-\\(\\) ])+$');

QUnit.test("Probar Letras", function(assert) {

  assert.ok(true == regex.test('A'), "Passed!");
});

QUnit.test("Probar Letras con tildes (Mayusculas)", function(assert) {

  assert.ok(true == regex.test('É'), "Passed!");
});

QUnit.test("Probar Letras con tildes (Minusculas)", function(assert) {

  assert.ok(true == regex.test('áéíóú'), "Passed!");
});

QUnit.test("Probar Letras con Dieresis (Mayusculas)", function(assert) {

  assert.ok(true == regex.test('Ä'), "Passed!");
});

QUnit.test("Probar Letras con Dieresis (Minusculas)", function(assert) {

  assert.ok(true == regex.test('ä'), "Passed!");
});
QUnit.test("Probar Letras  (Ñ)", function(assert) {

  assert.ok(true == regex.test('Ñ'), "Passed!");
  assert.ok(true == regex.test('Ññ'), "Passed!");
});

QUnit.test("Probar Números", function(assert) {
  assert.ok(true == regex.test('1'), "Passed!");

});

QUnit.test("Probar textos largos", function(assert) {
  assert.ok(true == regex.test('hola como estas'), "Passed!");
});


QUnit.test("Probar caracteres especiales permitidos", function(assert) {
  assert.ok(true == regex.test('hola como estas .,'), "Passed!");
});

QUnit.test("Probar caracteres especiales no permitidos", function(assert) {
  assert.ok(false == regex.test('hola como estas /*-+'), "Passed!");
  assert.ok(false == regex.test('<'), "Passed!");
  assert.ok(false == regex.test('>'), "Passed!");
  assert.ok(false == regex.test('"'), "Passed!");
  assert.ok(false == regex.test('/'), "Passed!");
  assert.ok(false == regex.test('*'), "Passed!");
  assert.ok(false == regex.test('+'), "Passed!");

  assert.ok(false == regex.test('SCRIPT SRC=http:\/\/xss.rocks\/xss.js><\/SCRIPT>'), "Passed!");

});

QUnit.test("Probar caracteres especiales permitidos", function(assert) {
  assert.ok(true == regex.test('hola como estas .,'), "Passed!");
});


QUnit.test("Probar texto lorem ipsum", function(assert) {
  assert.ok(true == regex.test('Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) '), "Passed!");
});


QUnit.test("Probar texto lorem ipsum 2", function(assert) {
  assert.ok(true == regex.test('Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) '), "Passed!");
});