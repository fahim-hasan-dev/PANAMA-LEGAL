export const translations = {
  en: {
    // Shared / System
    success: "Success",
    error: "Error",
    userNotFound: "User not found",

    // Authentication Emails
    createAccountSubject: (userName: string) => `Verify your account, ${userName} - PV ASOCIADOS`,
    createAccountTitle: "Confirm Your Registration",
    createAccountBody: (userName: string) => `Hello <strong style="color: #0F172A;">${userName}</strong>,<br>Thank you for joining <strong>PV ASOCIADOS</strong>. Please use the verification code below to confirm your account and complete your registration.`,
    resetPasswordSubject: (userName: string) => `Reset your PV ASOCIADOS password, ${userName}`,
    resetPasswordTitle: "Password Reset Request 🔐",
    resetPasswordBody: (userName: string) => `Hi <strong style="color: #0F172A;">${userName}</strong>, 👋<br>We received a request to reset your password for your <strong>PV ASOCIADOS</strong> account. Enter the code below to complete the process:`,
    resendOtpSubjectReset: "Password Reset - New Code",
    resendOtpSubjectCreate: "Account Verification - New Code",
    resendOtpTitleReset: "Reset Your Password 🔐",
    resendOtpTitleCreate: "Verify Your Account 🚀",
    resendOtpBodyReset: "You requested a new verification code to reset your PV ASOCIADOS password.",
    resendOtpBodyCreate: "Here is your new verification code to complete your PV ASOCIADOS account setup.",
    otpExpireWarning: "This verification code will expire in <strong>5 minutes</strong>.",
    ignoreWarning: "If you did not request this, you can safely ignore this email.",
    securityTip: "⚠️ <strong>Security Tip:</strong> Never share your reset code with anyone. PV ASOCIADOS will never ask for it.",

    // Emails
    caseRequestSentSubject: (citizenName: string) => `⚖️ New Case Request from ${citizenName} – PV ASOCIADOS`,
    caseRequestSentTitle: "New Case Request Received ⚖️",
    caseRequestSentBody: (lawyerName: string, citizenName: string) => `
      Hello <strong>${lawyerName}</strong>,<br>
      You have received a new case request from <strong>${citizenName}</strong> on PV ASOCIADOS.<br>
      Please log in to your dashboard to review and accept or decline this request.
    `,

    caseRequestAcceptedSubject: (lawyerName: string) => `✅ Case Request Accepted by ${lawyerName} – PV ASOCIADOS`,
    caseRequestAcceptedTitle: "Case Request Accepted ✅",
    caseRequestAcceptedBody: (citizenName: string, lawyerName: string) => `
      Hello <strong>${citizenName}</strong>,<br>
      Great news! Your case request has been accepted by <strong>${lawyerName}</strong>.<br>
      You can now log in to PV ASOCIADOS to communicate with your lawyer.
    `,

    caseRequestRejectedSubject: (lawyerName: string) => `❌ Case Request Declined by ${lawyerName} – PV ASOCIADOS`,
    caseRequestRejectedTitle: "Case Request Declined ❌",
    caseRequestRejectedBody: (citizenName: string, lawyerName: string) => `
      Hello <strong>${citizenName}</strong>,<br>
      Unfortunately, your case request has been declined by <strong>${lawyerName}</strong>.<br>
      Please log in to PV ASOCIADOS to find and request another available lawyer.
    `,

    // Push Notifications
    caseRequestPushTitle: "New Case Request",
    caseRequestPushBody: (citizenName: string) => `You have received a new case request from ${citizenName}.`,
    
    caseAcceptedPushTitle: "Case Request Accepted",
    caseAcceptedPushBody: (lawyerName: string) => `Your case request has been accepted by ${lawyerName}.`,

    caseDeclinedPushTitle: "Case Request Declined",
    caseDeclinedPushBody: (lawyerName: string) => `Your case request was declined by ${lawyerName}.`,

    caseCancelledPushTitle: "Case Request Cancelled",
    caseCancelledPushBody: (citizenName: string) => `The case request was cancelled by ${citizenName}.`,

    caseClosedPushTitle: "Case Closed",
    caseClosedPushBody: (lawyerName: string) => `Your case has been closed by ${lawyerName}.`,

    newReviewPushTitle: "New Review",
    newReviewPushBody: (citizenName: string) => `You received a new review from ${citizenName}.`,

    // API Responses
    "Profile updated successfully": "Profile updated successfully",
    "Users fetched successfully": "Users fetched successfully",
    "User fetched successfully": "User fetched successfully",
    "User deleted successfully": "User deleted successfully",
    "Profile fetched successfully": "Profile fetched successfully",
    "Account deleted successfully": "Account deleted successfully",
    "User account created successfully": "User account created successfully",
    "FCM token updated successfully": "FCM token updated successfully",
    "Token not found!": "Token not found!",
    "You don't have permission to access this API": "You don't have permission to access this API",
    "Access Token has expired": "Access Token has expired",
    "Invalid Access Token": "Invalid Access Token",
    "User not found": "User not found",
    "Email already exists.": "Email already exists.",
  },

  es: {
    // Shared / System
    success: "Éxito",
    error: "Error",
    userNotFound: "Usuario no encontrado",

    // Authentication Emails
    createAccountSubject: (userName: string) => `Verifique su cuenta, ${userName} - PV ASOCIADOS`,
    createAccountTitle: "Confirme su registro",
    createAccountBody: (userName: string) => `Hola <strong style="color: #0F172A;">${userName}</strong>,<br>Gracias por unirse a <strong>PV ASOCIADOS</strong>. Utilice el código de verificación a continuación para confirmar su cuenta y completar su registro.`,
    resetPasswordSubject: (userName: string) => `Restablezca su contraseña de PV ASOCIADOS, ${userName}`,
    resetPasswordTitle: "Solicitud de restablecimiento de contraseña 🔐",
    resetPasswordBody: (userName: string) => `Hola <strong style="color: #0F172A;">${userName}</strong>, 👋<br>Recibimos una solicitud para restablecer su contraseña de su cuenta <strong>PV ASOCIADOS</strong>. Ingrese el código a continuación para completar el proceso:`,
    resendOtpSubjectReset: "Restablecimiento de contraseña - Nuevo código",
    resendOtpSubjectCreate: "Verificación de cuenta - Nuevo código",
    resendOtpTitleReset: "Restablezca su contraseña 🔐",
    resendOtpTitleCreate: "Verifique su cuenta 🚀",
    resendOtpBodyReset: "Solicitó un nuevo código de verificación para restablecer su contraseña de PV ASOCIADOS.",
    resendOtpBodyCreate: "Aquí está su nuevo código de verificación para completar la configuración de su cuenta de PV ASOCIADOS.",
    otpExpireWarning: "Este código de verificación expirará en <strong>5 minutos</strong>.",
    ignoreWarning: "Si no solicitó esto, puede ignorar este correo electrónico de forma segura.",
    securityTip: "⚠️ <strong>Consejo de seguridad:</strong> Nunca comparta su código de restablecimiento con nadie. PV ASOCIADOS nunca se lo pedirá.",

    // Emails
    caseRequestSentSubject: (citizenName: string) => `⚖️ Nueva solicitud de caso de ${citizenName} – PV ASOCIADOS`,
    caseRequestSentTitle: "Nueva solicitud de caso recibida ⚖️",
    caseRequestSentBody: (lawyerName: string, citizenName: string) => `
      Hola <strong>${lawyerName}</strong>,<br>
      Ha recibido una nueva solicitud de caso de <strong>${citizenName}</strong> en PV ASOCIADOS.<br>
      Inicie sesión en su panel de control para revisar y aceptar o rechazar esta solicitud.
    `,

    caseRequestAcceptedSubject: (lawyerName: string) => `✅ Solicitud de caso aceptada por ${lawyerName} – PV ASOCIADOS`,
    caseRequestAcceptedTitle: "Solicitud de caso aceptada ✅",
    caseRequestAcceptedBody: (citizenName: string, lawyerName: string) => `
      Hola <strong>${citizenName}</strong>,<br>
      ¡Buenas noticias! Su solicitud de caso ha sido aceptada por <strong>${lawyerName}</strong>.<br>
      Ahora puede iniciar sesión en PV ASOCIADOS para comunicarse con su abogado.
    `,

    caseRequestRejectedSubject: (lawyerName: string) => `❌ Solicitud de caso rechazada por ${lawyerName} – PV ASOCIADOS`,
    caseRequestRejectedTitle: "Solicitud de caso rechazada ❌",
    caseRequestRejectedBody: (citizenName: string, lawyerName: string) => `
      Hola <strong>${citizenName}</strong>,<br>
      Lamentablemente, su solicitud de caso ha sido rechazada por <strong>${lawyerName}</strong>.<br>
      Inicie sesión en PV ASOCIADOS para buscar y solicitar otro abogado disponible.
    `,

    // Push Notifications
    caseRequestPushTitle: "Nueva solicitud de caso",
    caseRequestPushBody: (citizenName: string) => `Ha recibido una nueva solicitud de caso de ${citizenName}.`,
    
    caseAcceptedPushTitle: "Solicitud de caso aceptada",
    caseAcceptedPushBody: (lawyerName: string) => `Su solicitud de caso ha sido aceptada por ${lawyerName}.`,

    caseDeclinedPushTitle: "Solicitud de caso rechazada",
    caseDeclinedPushBody: (lawyerName: string) => `Su solicitud de caso fue rechazada por ${lawyerName}.`,

    caseCancelledPushTitle: "Solicitud de caso cancelada",
    caseCancelledPushBody: (citizenName: string) => `La solicitud de caso fue cancelada por ${citizenName}.`,

    caseClosedPushTitle: "Caso cerrado",
    caseClosedPushBody: (lawyerName: string) => `Su caso ha sido cerrado por ${lawyerName}.`,

    newReviewPushTitle: "Nueva reseña",
    newReviewPushBody: (citizenName: string) => `Has recibido una nueva reseña de ${citizenName}.`,

    // API Responses
    "Profile updated successfully": "Perfil actualizado con éxito",
    "Users fetched successfully": "Usuarios obtenidos con éxito",
    "User fetched successfully": "Usuario obtenido con éxito",
    "User deleted successfully": "Usuario eliminado con éxito",
    "Profile fetched successfully": "Perfil obtenido con éxito",
    "Account deleted successfully": "Cuenta eliminada con éxito",
    "User account created successfully": "Cuenta de usuario creada con éxito",
    "FCM token updated successfully": "Token FCM actualizado con éxito",
    "Token not found!": "¡Token no encontrado!",
    "You don't have permission to access this API": "No tienes permiso para acceder a esta API",
    "Access Token has expired": "El token de acceso ha expirado",
    "Invalid Access Token": "Token de acceso inválido",
    "User not found": "Usuario no encontrado",
    "Email already exists.": "El correo electrónico ya existe.",
  }
}

export type LanguageCode = keyof typeof translations;
export const getTranslation = (lang?: string) => {
  const language = (lang === 'es' || lang === 'en') ? lang : 'es'; // Default to Spanish since it's Panama Legal
  return translations[language];
}
