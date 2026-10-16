const signupForm = document.getElementById("signup-form");
const signupEmail = document.getElementById("signup-email");
const signupMessage = document.getElementById("signup-message");
const signupButton = signupForm.querySelector("button");

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (signupButton.disabled) return;
  signupEmail.value = signupEmail.value.trim();
  if (!signupForm.reportValidity()) return;

  signupButton.disabled = true;
  signupButton.textContent = "Joining…";
  signupForm.setAttribute("aria-busy", "true");
  signupMessage.textContent = "Joining…";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch("https://aggravated-assault-signup.safeteeguru.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: signupEmail.value }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error("Signup failed");
    signupMessage.textContent = "You’re on the list. Welcome to the assault.";
    signupForm.reset();
  } catch (error) {
    signupMessage.textContent = "We couldn’t confirm your signup. Try again or email aggravatedassaultband1@gmail.com.";
  } finally {
    clearTimeout(timeout);
    signupButton.disabled = false;
    signupButton.textContent = "Join Now";
    signupForm.removeAttribute("aria-busy");
  }
});
