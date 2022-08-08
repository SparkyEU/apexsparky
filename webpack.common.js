module.exports = {
  entry: {
    map: './dist/map',
    radar: './dist/radar',
    sense: './dist/sense',
    Aim: './dist/Aim',
    norecoil: './dist/norecoil'
    
  },
  output: {
    filename: '[name].min.js',
    path: `${__dirname}/docs`
  }
};
