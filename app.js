const express = require('express');
const app = express();
//获得post请求body内容的中间件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
//

//每一次操作后输出操作内容
const morgan = require('morgan');
app.use(morgan('short'));
//

app.use('/user',require('../SaleSystem/routes/user'));
app.use('/salesperson',require('../SaleSystem/routes/SalespersonAPI'));
app.use('/regionManager',require('../SaleSystem/routes/RegionManagerAPI'));

app.use(express.static('./public'));


const port = 5000;

app.listen(port, () => {
  console.log('Server started on port ' + port);
});