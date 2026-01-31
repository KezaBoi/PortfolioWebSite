
import {
  PERSONAL_INFO,
  HERO_CONTENT,
  ABOUT_CONTENT,
  EXPERIENCE,
  PROJECTS,
  EDUCATION,
  SERVICES,
  ARTICLES,
  CONTACT_MESSAGE
} from "../data/portfolio";

export { PERSONAL_INFO, HERO_CONTENT, EXPERIENCE, PROJECTS, EDUCATION, SERVICES, ARTICLES };

// Aliases for backward compatibility
export const ABOUT_TEXT = ABOUT_CONTENT.description;
export const CONTACT = {
  address: PERSONAL_INFO.address,
  phoneNo: PERSONAL_INFO.phone,
  email: PERSONAL_INFO.email,
};
export const CONTACT_1 = {
  message: CONTACT_MESSAGE.message,
  email: PERSONAL_INFO.email,
};
