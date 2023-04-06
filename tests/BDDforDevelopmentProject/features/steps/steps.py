from behave import *
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

@then('the user successfully logs in')
def succesffullyLogsIn(context):
    context.wait = WebDriverWait(context.driver, 20)
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//input[contains(@placeholder,'Email')]"))).send_keys(
        "johnfoo@bar.com")
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//input[contains(@placeholder,'Password')]"))).send_keys(
        "somesillypassword")
    context.wait.until(EC.element_to_be_clickable((By.XPATH, "//div[@role='button']/div[text()='Login']"))).click()

@then('the page displays Sign Out as an option')
def verify_sign_out(context):
    assert(EC.visibility_of_element_located((By.XPATH, "//div[text()='Sign Out']")))