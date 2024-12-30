import React, { useState } from 'react';
import App from '../App';
import logo from "../assets/images/logo.png";

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const { name, email, password } = formData;
        if (!name) return 'Name is required';
        if (!email) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(email)) return 'Enter a valid email';
        if (!password) return 'Password is required';
        if (password.length < 6) return 'Password must be at least 6 characters';
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        try {
            // Simulate a registration request
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log('Registration successful:', formData);
            setIsRegistered(true);
            alert('Registration Successful');
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (isRegistered) {
        return <App />;
    } else {
        return (
            <div style={styles.container}>
                <div style={styles.logoContainer}>
                    <img
                        src={logo} // Replace with your logo URL
                        alt="Logo"
                        style={styles.logo}
                    />
                </div>
                <h2>Register</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    {error && <div style={styles.error}>{error}</div>}
                    <div style={styles.inputGroup}>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        );
    }
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '200px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        color: 'white',
    },
    logoContainer: {
        marginBottom: '20px',
    },
    logo: {
        width: '100px',
        height: '100px',
        objectFit: 'contain',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputGroup: {
        marginBottom: '15px',
        textAlign: 'left',
    },
    input: {
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '14px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    error: {
        marginBottom: '15px',
        color: 'red',
    },
};

export default RegisterPage;
