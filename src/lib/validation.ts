export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  guests: number;
  specialRequests: string;
}

export interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  guests?: string;
}

export function validateBookingForm(
  data: BookingFormData,
  maxGuests: number
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.firstName.trim()) {
    errors.firstName = "First name is required";
  } else if (data.firstName.trim().length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  }

  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required";
  } else if (data.lastName.trim().length < 2) {
    errors.lastName = "Last name must be at least 2 characters";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^[\d\s\-\+\(\)]{7,20}$/.test(data.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  if (data.guests < 1) {
    errors.guests = "At least 1 guest is required";
  } else if (data.guests > maxGuests) {
    errors.guests = `Maximum ${maxGuests} guests allowed for this activity`;
  }

  return errors;
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}
