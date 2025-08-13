import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useNavigate, Link } from "react-router-dom";
import signupBg from '@/assets/signup-bg.svg';
import { signupUserApi } from "@/redux/Actions";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useSelector } from "react-redux";
import { clearLoginError } from "@/redux/appSlice";

// Form validation schema
const registerSchema = z.object({
  name: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(3, { message: "Invalid phone number" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions" })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginDetails = useSelector((state: any) => state.easyquiz.loginDetails);
  
  // Initialize form
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false
    }
  });
  
  // Handle form submission - directly navigate to dashboard without validation
  const onSubmit = async (data: RegisterFormValues) => {
   
    console.log("Form submitted:", data);
    const signupRequest = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      role: "Admin",
      profilePic: "",
    };
    
    dispatch(signupUserApi(signupRequest))
  };


    useEffect(() => {
      if (loginDetails.isLoggedIn) {
        navigate("/home/dashboard");
      }
    }, [loginDetails]);

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
       <div className="w-full min-h-screen flex items-center justify-start md:pl-50 bg-no-repeat bg-right bg-contain" 
        style={{ backgroundImage: `url(${signupBg})` }}>
      <Card className="w-full max-w-md">
        <CardContent className="pt-8 pb-6 px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-medium text-primary-dark mb-2">Create Account</h1>
            <p className="text-gray-600">Join LinguaExam and start learning</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="absolute text-xs top-2 left-3 text-gray-500">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your full name" 
                        className="pt-7 pb-2" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="absolute text-xs top-2 left-3 text-gray-500">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="pt-7 pb-2" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="absolute text-xs top-2 left-3 text-gray-500">
                      Phone
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="tel"
                        placeholder="Choose a phone number" 
                        className="pt-7 pb-2" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="absolute text-xs top-2 left-3 text-gray-500">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Create a password" 
                        className="pt-7 pb-2" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="absolute text-xs top-2 left-3 text-gray-500">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Confirm your password" 
                        className="pt-7 pb-2" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-2">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange} 
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm text-gray-700">
                        I agree to the <a href="#" className="text-primary hover:text-primary-dark">Terms of Service</a> and <a href="#" className="text-primary hover:text-primary-dark">Privacy Policy</a>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {
                loginDetails.isError && 
                <div className="w-full flex  justify-center text-red-500" >{loginDetails.errorMessage}</div>
              }
             
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loginDetails.isLoading}
              >
                {loginDetails.isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?
              <Link 
                onClick={() => dispatch(clearLoginError())}
                to="/" 
                className="font-medium text-primary hover:text-primary-dark ml-1"
              >
                 Sign in
              </Link>
             
            </p>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default Register;
