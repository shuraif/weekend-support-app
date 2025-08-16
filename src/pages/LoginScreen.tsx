import { useEffect } from "react";
import { Button } from '../components/ui/button'

import { useNavigate, Link } from 'react-router-dom'
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import loginBg from '@/assets/login-bg.svg';
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { loginUserApi } from "@/redux/Actions";
import { clearLoginError } from "@/redux/appSlice";

function LoginScreen() {

const navigate = useNavigate();

const loginDetails = useSelector((state: any) => state.easyquiz.loginDetails);
const dispatch = useAppDispatch();

const loginSchema = z.object({
  email: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional()
});
type LoginFormValues = z.infer<typeof loginSchema>;

const form = useForm<LoginFormValues>({
  resolver: zodResolver(loginSchema),
  defaultValues: {
    email: "",
    password: "",
    rememberMe: false
  }
});

const onSubmit = async (data: LoginFormValues) => {
  console.log("Form submitted:", data);
  const loginRequest = {
    email: data.email,
    password: data.password,
  };

  dispatch(loginUserApi(loginRequest))

};

    useEffect(() => {
      if (loginDetails.isLoggedIn) {
        console.log("User is logged in, redirecting to dashboard");
        navigate("/home/weekendsupport");
      }
    }, [loginDetails]);

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
       <div className="w-full min-h-screen flex items-center justify-start md:pl-50  bg-no-repeat bg-right bg-contain" 
       style={{ backgroundImage: `url(${loginBg})` }}>
        <Card className="w-full max-w-md shadow-lg bg-white rounded-lg">
          <CardContent className="pt-8 pb-6 px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-medium text-primary-dark mb-2">Quzly Admin</h1>
              <p className="text-gray-600"></p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel className="absolute text-xs top-2 left-3 text-gray-500">
                        Email
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
                  name="password"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel className="absolute text-xs top-2 left-3 text-gray-500">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Enter your password" 
                          className="pt-7 pb-2" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Checkbox id="rememberMe" checked={field.value} onCheckedChange={field.onChange} />
                        <label htmlFor="rememberMe" className="text-sm text-gray-700 cursor-pointer">
                          Remember me
                        </label>
                      </div>
                    )}
                  />
                  
                  <a 
                    href="/forgot-password" 
                    className="text-sm font-medium text-primary hover:text-primary-dark"
                  >
                    Forgot password?
                  </a>
                </div>
                
                {
                  loginDetails.isError && 
                  <div className="w-full flex  justify-center text-red-500" >{loginDetails.errorMessage}</div>
                }
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loginDetails.isLoading}
                >
                  {loginDetails.isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </Form>
            
             <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?
              <Link 
                onClick={() => dispatch(clearLoginError())}
                to="/register" 
                className="font-medium text-primary hover:text-primary-dark ml-1"
              >
                Sign up
              </Link>
            </p>
          </div>
          </CardContent>
        </Card>
        </div>
      </div>
    );
  };

export default LoginScreen