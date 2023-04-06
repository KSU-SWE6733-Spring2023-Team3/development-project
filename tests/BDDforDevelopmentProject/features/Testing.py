from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("http://35.202.95.163/")
driver.find_element(By.XPATH, "//a[contains(@href,'/login')]").click()

wait = WebDriverWait(driver,20)
wait.until(EC.element_to_be_clickable((By.XPATH, "//input[contains(@placeholder,'Email')]"))).send_keys("johnfoo@bar.com")
wait.until(EC.element_to_be_clickable((By.XPATH, "//input[contains(@placeholder,'Password')]"))).send_keys("somesillypassword")
wait.until(EC.element_to_be_clickable((By.XPATH, "//div[@role='button']/div[text()='Login']"))).click()

print("Successfully logged in!")
# time.wait(10)

# driver.close()