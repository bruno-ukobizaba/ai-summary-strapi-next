const fetch = require("node-fetch");

async function getAuthToken() {
  try {
    const response = await fetch("http://localhost:1337/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "admin@example.com",
        password: "Admin1234",
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Authentication failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.data.token;
  } catch (error) {
    console.error("Error getting auth token:", error);
    throw error;
  }
}

async function updateHomePage(token) {
  try {
    // First, get the current home page data
    const getResponse = await fetch(
      "http://localhost:1337/admin/content-manager/single-types/api::home-page.home-page?populate=blocks",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!getResponse.ok) {
      throw new Error(
        `Failed to get home page: ${getResponse.status} ${getResponse.statusText}`
      );
    }

    const homePageData = await getResponse.json();
    const currentBlocks = homePageData.data.blocks || [];

    // Add testimonials section
    const testimonialsSection = {
      __component: "layout.testimonials-section",
      title: "What Our Customers Say",
      description: "Hear from people who have used our platform",
      testimonials: [
        {
          name: "John Doe",
          role: "CEO, TechCorp",
          content:
            "This platform has transformed how we operate. Highly recommended!",
          rating: 5,
        },
        {
          name: "Jane Smith",
          role: "Marketing Director",
          content: "Easy to use and incredibly powerful. Our team loves it!",
          rating: 5,
        },
        {
          name: "Robert Johnson",
          role: "Small Business Owner",
          content: "The best investment I've made for my business in years.",
          rating: 4,
        },
      ],
    };

    // Add FAQ section
    const faqSection = {
      __component: "layout.faq-section",
      title: "Frequently Asked Questions",
      description: "Find answers to common questions about our platform",
      faqs: [
        {
          question: "How do I get started?",
          answer:
            "Simply sign up for an account and follow our quick start guide. You'll be up and running in minutes.",
        },
        {
          question: "Is there a free trial?",
          answer:
            "Yes, we offer a 14-day free trial with full access to all features. No credit card required.",
        },
        {
          question: "What kind of support do you offer?",
          answer:
            "We provide 24/7 email support and live chat during business hours. Our knowledge base is also available anytime.",
        },
        {
          question: "Can I cancel my subscription?",
          answer:
            "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees.",
        },
      ],
    };

    // Add the new sections to the existing blocks
    const updatedBlocks = [...currentBlocks, testimonialsSection, faqSection];

    // Update the home page with the new blocks
    const updateResponse = await fetch(
      "http://localhost:1337/admin/content-manager/single-types/api::home-page.home-page",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          blocks: updatedBlocks,
        }),
      }
    );

    if (!updateResponse.ok) {
      throw new Error(
        `Failed to update home page: ${updateResponse.status} ${updateResponse.statusText}`
      );
    }

    const result = await updateResponse.json();
    console.log("Home page updated successfully!");
    console.log("Added testimonials and FAQ sections.");
    return result;
  } catch (error) {
    console.error("Error updating home page:", error);
    throw error;
  }
}

// Main function
async function main() {
  try {
    const token = await getAuthToken();
    await updateHomePage(token);
  } catch (error) {
    console.error("Script failed:", error);
    process.exit(1);
  }
}

main();
