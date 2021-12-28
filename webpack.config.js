const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// In prod in Heroku it will be 'production', in test 'test' and default will be 'development'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development' });
}

module.exports = (env) => {
    // If we are in production environment isProduction will be true, if we are in development, it will be false
    const isProduction = env === 'production';
    // This is use to make the styles.css file in the public directory
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
        // Where the actual app comes from
        entry: ['babel-polyfill', './src/app.js'],
        // Where the app is going to be compiled
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    //  This will run babel for all .js files
                    loader: 'babel-loader',
                    test: /\.js$/,
                    exclude: /node_modules/
                },
                {
                    //  This will run babel for all .scss files. The ? makes the first s optional
                    test: /\.s?css$/,
                    // This allows us to use an array of loaders
                    use: CSSExtract.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            // This uses node-sass to convert .scss to .css
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    })
                }
            ]
        },
        plugins: [
            CSSExtract,
            new webpack.DefinePlugin({
              'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
              'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
              'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
              'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
              'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
              'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
            })
        ],
        // This controls how maps are generated. If there's an error, this will tell you exactly where
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        // This works as a server for the app on development mode
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            // This returns the index.html file once there is a 404 error so that we can have client routing
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    };
};
