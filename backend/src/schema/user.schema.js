import * as yup from "yup";

/**
 * @openapi
 * components:
 *  schemas:
 *    LoginUserInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: axel@gmail.com
 *        password:
 *          type: string
 *          default: Test@1234
 *    LoginUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        nom:
 *          type: string
 *        userId:
 *          type: string
 *        telephone:
 *          type: string
 *        adresse:
 *          type: string
 *        token:
 *          type: string
 *
 *    GetUsersResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          default: 'Successfully fetch the users'
 *        users:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *              nom:
 *                type: string
 *              telephone:
 *                type: string
 *              email:
 *                type: string
 *              adresse:
 *                type: string
 *              is_locked:
 *                type: boolean
 *                default: false
 *              user_type:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  code:
 *                    type: string
 *                  libelle:
 *                    type: string
 *        lastId:
 *          type: integer
 *
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - nom
 *        - prenom
 *        - telephone
 *        - email
 *        - adresse
 *        - userType
 *        - password
 *      properties:
 *        nom:
 *          type: string
 *          default: User
 *        prenom:
 *          type: string
 *          default: Test 1
 *        telephone:
 *          type: string
 *          default: +2250707020210
 *        email:
 *          type: string
 *          default: test1@test.com
 *        adresse:
 *          type: string
 *          default: Abidjan cocody blockoss
 *        userType:
 *          type: integer
 *          default: 2
 *        password:
 *          type: string
 *          default: Pass@1234
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          default: 'Successfully saved the user'
 *        user:
 *          type: object
 *          properties:
 *            id:
 *              type: integer
 *            nom:
 *              type: string
 *            telephone:
 *              type: string
 *            email:
 *              type: string
 *            adresse:
 *              type: string
 *            is_locked:
 *              type: boolean
 *              default: false
 *            user_type:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                code:
 *                  type: string
 *                libelle:
 *                  type: string
 */

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  /*
   * ^: Anchors the expression to the start of the string.
   * (?=.*[a-z]): Positive lookahead assertion for at least one lowercase letter.
   * (?=.*[A-Z]): Positive lookahead assertion for at least one uppercase letter.
   * (?=.*\d): Positive lookahead assertion for at least one digit.
   * (?=.*[@$!%*?&]): Positive lookahead assertion for at least one special character. You can customize the character set within the brackets to include the specific special characters you want to allow.
   * [A-Za-z\d@$!%*?&]{8,}: Matches a string of at least 8 characters that consists of letters (both lowercase and uppercase), digits, and the specified special characters.
   * $: Anchors the expression to the end of the string.
   * */
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
});

export default schema;
