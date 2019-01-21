require('chromedriver'); //导入chrome浏览器 driver
var webdriver = require('selenium-webdriver'); //导入selenium 库
By = webdriver.By,
until = webdriver.until;
function openChrom(){
    var driver = new webdriver.Builder().forBrowser('chrome').build(); //创建一个chrome 浏览器实例
    driver.get("https://user.qzone.qq.com/qq账号");
    driver.switchTo().frame(driver.findElement(By.id("login_frame")));
    driver.findElement(By.id("switcher_plogin")).click()
    driver.executeScript('document.getElementById("u").value="qq账号"')
    driver.executeScript('document.getElementById("p").value="密码"')
    driver.findElement(By.id("login_button")).click()
    driver.manage().window().maximize(); 
    driver.switchTo().defaultContent();
    dianzan(driver)
}
function dianzan(driver){
    driver.findElements(By.className("fui-icon icon-op-praise")).then((arr)=>{
        for(let i=0;i<arr.length;i++){
             arr[i].getCssValue('background-position').then(v=>{
                 if(v=='-458px -286px'){
                     console.log(i,'已赞')
                 }else{
                     console.log(i,'点赞')
                     arr[i].click()
                 }
             })
        }
    })
    driver.findElements(By.className("info-detail")).then((arr)=>{
        arr[arr.length-1].getText().then(v=>{
            if(v.length>5){
                console.log('当天的说说已经赞完了')
                driver.quit()
                driver.sleep(24*60*60*1000)     //点赞时差
                openChrom()
            }else{
                driver.executeScript('document.documentElement.scrollTop=100000');          //模拟滚动加载更多动态
                dianzan(driver)
            }
        })
    })
}
openChrom() //程序入口