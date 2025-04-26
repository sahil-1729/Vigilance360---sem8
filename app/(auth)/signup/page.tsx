'use client'

// export const metadata = {
//   title: "Sign Up - Open PRO",
//   description: "Page description",
// };

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation";

const FormSchema = z
  .object({
    name: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    company: z.string().min(1, 'Company name is required').max(100),
  });

export default function SignUp() {
  const [errorM, setErrorM] = useState<string>('');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      password: '',
    },
  });

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {

    // console.log(values)
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    });

    const jsonResponse = await response.json();
    console.log("sign up response ", jsonResponse)

    if (jsonResponse.user) {
      router.push('/signin');
    } else {
      console.log("Error ", jsonResponse?.error.name)
      setErrorM(jsonResponse?.message)
      setTimeout(() => {
        setErrorM('')
      }, 5000);
      console.error('Signup error occurred');

    }

  };

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Create an account
            </h1>
          </div>
          {/* Contact form */}

          <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-[400px]">
            <div className="space-y-5">
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="name"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  className="form-input w-full"
                  placeholder="Your full name"
                  required

                  {...form.register("name")}

                />
                <label
                  className="mb-1 block text-sm font-medium text-red-500"
                  htmlFor="name"
                >
                  {form.formState.errors.name?.message}
                </label>
              </div>
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="name"
                >
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="company"
                  type="text"
                  className="form-input w-full"
                  placeholder="Your company name"
                  {...form.register("company")}
                />
                <label
                  className="mb-1 block text-sm font-medium text-red-500"
                  htmlFor="name"
                >
                  {form.formState.errors.company?.message}
                </label>
              </div>
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="email"
                >
                  Work Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-input w-full"
                  placeholder="Your work email"
                  required
                  {...form.register("email")}

                />
                <label
                  className="mb-1 block text-sm font-medium text-red-500"
                  htmlFor="name"
                >
                  {form.formState.errors.email?.message}
                </label>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-indigo-200/65"
                  htmlFor="password"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-input w-full"
                  placeholder="Password (at least 10 characters)"
                  required
                  {...form.register("password")}

                />
                <label
                  className="mb-1 block text-sm font-medium text-red-500"
                  htmlFor="name"
                >
                  {form.formState.errors.password?.message}
                </label>
              </div>
            </div>

            <div className={`${errorM === '' ? 'hidden' : ''} mt-6 space-y-5 text-center py-4 w-full rounded bg-red-600 text-white`}
            >
              {errorM}
            </div>

            {/* <div className="mt-6 space-y-5"> */}
            <button className="mt-6 space-y-5 btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]"
              type="submit"
            >
              Register
            </button>
            {/* <div className="flex items-center gap-3 text-center text-sm italic text-gray-600 before:h-px before:flex-1 before:bg-gradient-to-r before:from-transparent before:via-gray-400/25 after:h-px after:flex-1 after:bg-gradient-to-r after:from-transparent after:via-gray-400/25">
                or
              </div>
              <button className="btn relative w-full bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]">
                Sign In with Google
              </button> */}
            {/* </div> */}

          </form>



          {/* Bottom link */}
          <div className="mt-6 text-center text-sm text-indigo-200/65">
            Already have an account?{" "}
            <Link className="font-medium text-indigo-500" href="/signin">
              Sign in
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}


