from behave import *
from selenium import webdriver
from selenium.webdriver.common.by import By

@given('a user launches Chrome')
def launchBrowser(context):
    # NOTE: Webdriver has to be in the correct folder, add information in Readme
    context.driver=webdriver.Chrome()

@when('a user opens our homepage')
def ourHomePage(context):
    context.driver.get("http://35.202.95.163/")
    loginLink = context.driver.find_element(By.XPATH, "//a[contains(@href,'/login')]")
    loginLink.click()

@then('the user successfully logs in')
def clickLogIn(context):
    def impl(context):
        client = context.test.client
        client.login(email='johnfoo@bar.com', password='somesillypassword')

        cookie = client.cookies['sessionid']

        context.browser.add_cookie({
            'name': 'sessionid',
            'value': cookie.value,
            'secure': False,
            'path': '/',
        })