import { p } from 'framer-motion/client';
import type { Route } from './+types/contact';
import { Form } from 'react-router';

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;
  const subject = formData.get('subject') as string;

  let errors: Record<string, string> = {};
  if (!name) errors.name = 'Please Enter Your Name';
  if (!email) {
    errors.email = 'Please Enter Your Email';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Invalid Email Format';
  }
  if (!subject) errors.subject = 'Subject Is Required';
  if (!message) errors.message = 'Message Is Required';

  // Check if there are any errors (empty fields)
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const data = {
    name,
    subject,
    email,
    message,
  };

  return { message: 'Form Submitted Successfully', data };
}

const ContactPage = ({ actionData }: Route.ComponentProps) => {
  const errors = actionData?.errors || {};

  return (
    <div className="max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Contact Me
      </h2>
      {actionData?.message ? (
        <p className="mb-6 py-3 bg-green-700 text-green-100 text-center rounded-lg border-green-500 shadow-md">
          {actionData.message}
        </p>
      ) : null}
      <Form method="post" className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="sunject"
            className="block text-sm font-medium text-gray-300"
          >
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
          {errors.subject && (
            <p className="text-red-400 text-sm mt-1">{errors.subject}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-300"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
          {errors.message && (
            <p className="text-red-400 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <button className="w-full bg-blue-600 text-white py-2 cursor-pointer transition rounded-lg hover:bg-blue-800 ">
          Send Message
        </button>
      </Form>
    </div>
  );
};

export default ContactPage;
