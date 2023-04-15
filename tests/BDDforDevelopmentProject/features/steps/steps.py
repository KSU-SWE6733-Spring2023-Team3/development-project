from behave import given, when, then
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

@given('a user launches Chrome')
def launchBrowser(context):
    # NOTE: Webdriver has to be in the correct folder, add information in Readme
    context.driver = webdriver.Chrome()

@when('a user opens our homepage')
def ourHomePage(context):
    context.driver.get("http://35.202.95.163/")

@when('they click the login page')
def clickLogIn(context):
    context.driver.find_element(By.XPATH, "//a[contains(@href,'/login')]").click()

@when('they click the sign up page')
def clickSignUp(context):
    context.driver.find_element(By.XPATH, "//a[contains(@href,'/register')]").click()

@when('the user successfully logs in')
def successfullyLogsIn(context):
    context.wait = WebDriverWait(context.driver, 20)
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//input[contains(@placeholder,'Email')]"))).send_keys(
        "johnfoo@bar.com")
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//input[contains(@placeholder,'Password')]"))).send_keys(
        "somesillypassword")
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//div[@role='button']/div[text()='Login']"))).click()

@when('the user successfully registers')
def successfullyRegisters(context):
    context.wait = WebDriverWait(context.driver, 20)
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//input[contains(@placeholder,'Name')]"))).send_keys(
        "Joe Schmoe")
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//input[contains(@placeholder,'Email')]"))).send_keys(
        "dummyemail@thisisntreal.com")
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//input[contains(@placeholder,'Password')]"))).send_keys(
        "aaaaAAAA1111!!!!")
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//div[@tabindex='0']/div[text()='Register']"))).click()

@when('the user forgets to add Name')
def noNameRegisters(context):
    context.wait = WebDriverWait(context.driver, 20)
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//input[contains(@placeholder,'Email')]"))).send_keys(
        "dummyemail@thisisntreal.com")
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//input[contains(@placeholder,'Password')]"))).send_keys(
        "aaaaAAAA1111!!!!")
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//div[@tabindex='0']/div[text()='Register']"))).click()

@when('the user forgets to add Email')
def noEmailRegisters(context):
    context.wait = WebDriverWait(context.driver, 20)
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//input[contains(@placeholder,'Name')]"))).send_keys(
        "Joe Schmoe")
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//input[contains(@placeholder,'Password')]"))).send_keys(
        "aaaaAAAA1111!!!!")
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//div[@tabindex='0']/div[text()='Register']"))).click()

@when('the user forgets to add Password')
def noPasswordRegisters(context):
    context.wait = WebDriverWait(context.driver, 20)
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//input[contains(@placeholder,'Name')]"))).send_keys(
        "Joe Schmoe")
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//input[contains(@placeholder,'Email')]"))).send_keys(
        "dummyemail@thisisntreal.com")
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//div[@tabindex='0']/div[text()='Register']"))).click()

@when('the user has incorrect Name')
def badNameRegisters(context):
    context.wait = WebDriverWait(context.driver, 20)
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//input[contains(@placeholder,'Name')]"))).send_keys(
        "J")
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//input[contains(@placeholder,'Email')]"))).send_keys(
        "dummyemail@thisisntreal.com")
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//input[contains(@placeholder,'Password')]"))).send_keys(
        "aaaaAAAA1111!!!!")
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//div[@tabindex='0']/div[text()='Register']"))).click()

@when('the user adds an invalid Email format')
def badEmailRegisters(context):
    context.wait = WebDriverWait(context.driver, 20)
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//input[contains(@placeholder,'Name')]"))).send_keys(
        "Joe Schmoe")
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//input[contains(@placeholder,'Email')]"))).send_keys(
        "dummyemail@thisisntreal")
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//input[contains(@placeholder,'Password')]"))).send_keys(
        "aaaaAAAA1111!!!!")
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//div[@tabindex='0']/div[text()='Register']"))).click()

@when('the user does not use a long enough Password')
def badPasswordRegisters(context):
    context.wait = WebDriverWait(context.driver, 20)
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//input[contains(@placeholder,'Name')]"))).send_keys(
        "Joe Schmoe")
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//input[contains(@placeholder,'Email')]"))).send_keys(
        "dummyemail@thisisntreal.com")
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//input[contains(@placeholder,'Password')]"))).send_keys(
        "aA1!")
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//div[@tabindex='0']/div[text()='Register']"))).click()

@then('the page displays Sign Out as an option')
def verify_sign_out(context):
    assert(EC.visibility_of_element_located((By.XPATH, "//div[text()='Sign Out']")))

@then('the Name error message is returned')
def nameErrorReturned(context):
    assert(EC.visibility_of_element_located((By.XPATH, "//div[text()='Name must be at least 2 characters']")))

@then('the Email error message is returned')
def emailErrorReturned(context):
    assert(EC.visibility_of_element_located((By.XPATH, "//div[text()='Invalid email address']")))

@then('the Password error message is returned')
def passwordErrorReturned(context):
    assert(EC.visibility_of_element_located((By.XPATH, "//div[text()='Password must be at least 16 characters']")))