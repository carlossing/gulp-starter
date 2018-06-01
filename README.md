# gulp-starter

Template for starter project for Javascript, Less.

## Install

```bash
git clone https://github.com/cjies/gulp-starter-kit

cd gulp-starter-kit

npm install

gulp watch
```


## Config:

```

var config = {

    cssIn: [
        'src/css/*.less',
        'src/css/start-template.css'
    ],
    cssOut:'build/css',
    cssFileName: 'styles.min.css',
    cssReplaceOut: 'css/styles.min.css',
    jsIn: [
        'src/js/app1.js',
        'src/js/app2.js'
    ],
    htmlIn: [
        'src/index.html',
    ],
    htmlOut: 'build',
    imageIn: 'src/img/*.png',
    imageOut: 'build/img',
    jsFileName:'app.min.js',
    jsOut:'build/js',
    jsOutExt: '.js',
    jsReplaceOut: 'js/app.min.js',
    src: 'src',
    testIn: [
       'src/test/*.html'
    ],
    uglifyConfig: {
        compress: {
            drop_console:true
        },
        mangle: false,
        output: {
            beautify: false,
            comments: false 
        }
    }

};
```
## Commands:

Build
```bash
gulp build
```

Run watch command
```bash
gulp watch
```

Run unit test
```bash
gulp test
```


