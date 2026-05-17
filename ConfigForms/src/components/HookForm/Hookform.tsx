import { useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";

// Define TypeScript interfaces for the form data
interface IFormInput {
    title: string;
    name: string;
    surname: string;
    degree: FileList;
    passingYear: number;
    email: string;
    password: string;
}

// Interface for the backend response (adjust based on your API)
interface IApiResponse {
    message: string;
    user?: any;
}

function HookForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            // Create FormData for file upload
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("name", data.name);
            formData.append("surname", data.surname);
            
            // Check if file exists before appending
            if (data.degree && data.degree[0]) {
                formData.append("degree", data.degree[0]);
            }
            
            formData.append("passingYear", data.passingYear.toString());
            formData.append("email", data.email);
            formData.append("password", data.password);

            // Send to backend
            const response = await axios.post<IApiResponse>(
                "https://your-backend-url.com/api/register", // Replace with your actual endpoint
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Success:", response.data);
            alert("Form submitted successfully!");
            reset(); // Reset form after successful submission
            
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("API Error:", error.response?.data);
                alert(error.response?.data?.message || "Failed to submit form. Please try again.");
            } else {
                console.error("Unexpected error:", error);
                alert("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
            <h2>Registration Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Title Field */}
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                        Title:
                    </label>
                    <select 
                        {...register("title", { required: "Title is required" })}
                        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                    >
                        <option value="">Select Title</option>
                        <option value="Mr">Mr</option>
                        <option value="Ms">Ms</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Dr">Dr</option>
                    </select>
                    {errors.title && (
                        <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                            {errors.title.message}
                        </p>
                    )}
                </div>

                {/* Name Field */}
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                        Name:
                    </label>
                    <input 
                        {...register("name", { 
                            required: "Name is required",
                            minLength: { value: 2, message: "Name must be at least 2 characters" }
                        })} 
                        placeholder="Enter your name"
                        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                    />
                    {errors.name && (
                        <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Surname Field */}
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                        Surname:
                    </label>
                    <input 
                        {...register("surname", { 
                            required: "Surname is required",
                            minLength: { value: 2, message: "Surname must be at least 2 characters" }
                        })} 
                        placeholder="Enter your surname"
                        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                    />
                    {errors.surname && (
                        <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                            {errors.surname.message}
                        </p>
                    )}
                </div>

                {/* Degree File Field */}
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                        Degree Certificate (PDF/Image):
                    </label>
                    <input 
                        type="file" 
                        {...register("degree", { 
                            required: "Degree certificate is required",
                            validate: {
                                fileType: (value: FileList) => {
                                    if (!value || !value[0]) return true;
                                    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
                                    return allowedTypes.includes(value[0].type) || 
                                           "Only PDF, JPEG, or PNG files are allowed";
                                },
                                fileSize: (value: FileList) => {
                                    if (!value || !value[0]) return true;
                                    const maxSize = 5 * 1024 * 1024; // 5MB
                                    return value[0].size <= maxSize || 
                                           "File size must be less than 5MB";
                                }
                            }
                        })} 
                        accept=".pdf,.jpg,.jpeg,.png"
                        style={{ width: "100%", padding: "8px" }}
                    />
                    {errors.degree && (
                        <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                            {errors.degree.message as string}
                        </p>
                    )}
                </div>

                {/* Passing Year Field */}
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                        Passing Year:
                    </label>
                    <input 
                        type="number" 
                        {...register("passingYear", { 
                            required: "Passing year is required",
                            min: { value: 1950, message: "Year must be 1950 or later" },
                            max: { value: new Date().getFullYear(), message: `Year cannot be later than ${new Date().getFullYear()}` }
                        })} 
                        placeholder="YYYY"
                        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                    />
                    {errors.passingYear && (
                        <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                            {errors.passingYear.message}
                        </p>
                    )}
                </div>

                {/* Email Field */}
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                        Email:
                    </label>
                    <input 
                        type="email" 
                        {...register("email", { 
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })} 
                        placeholder="your@email.com"
                        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                    />
                    {errors.email && (
                        <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password Field */}
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                        Password:
                    </label>
                    <input 
                        type="password" 
                        {...register("password", { 
                            required: "Password is required",
                            minLength: { value: 8, message: "Password must be at least 8 characters" },
                            maxLength: { value: 12, message: "Password must not exceed 12 characters" },
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/,
                                message: "Password must contain at least one letter, one number, and one special character"
                            }
                        })} 
                        placeholder="Enter password"
                        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                    />
                    {errors.password && (
                        <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    style={{ 
                        marginTop: "10px", 
                        padding: "10px 20px",
                        backgroundColor: isSubmitting ? "#ccc" : "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                        width: "100%",
                        fontSize: "16px"
                    }}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}

export default HookForm;