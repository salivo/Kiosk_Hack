import cv2
import numpy as np
import tensorflow as tf

# Load your fruit classification model
model = tf.keras.models.load_model('fruit_model.h5')
model.summary()


# Define a list of fruit labels (adjust according to your model)
fruit_labels = [
    'banana', '2', 'orange', '3', 'tangerine',
    '5', '6', '7', '8', '9',
    '10', 'apple', '11', '12', '13'
]  # Add more fruits as needed

# Function to process the frame and predict fruit
def predict_fruit(frame):
    img = cv2.resize(frame, (150, 150))  # Ensure this matches your model input size
    img = np.expand_dims(img, axis=0) / 255.0  # Normalize input as done during training

    # Make sure the model is compiled and ready for prediction
    preds = model.predict(img)
    return preds


# Open the camera
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Predict the fruit in the frame
    prediction = predict_fruit(frame)
    print(f"Prediction shape: {prediction[0].shape}")
    print(model.get_config())
    predicted_class = np.argmax(prediction[0])  # Get the index of the highest prediction
    confidence = prediction[0][predicted_class]

    # Only display if confidence is above a threshold (e.g., 0.5)
    if confidence > 0.5:
        label = f"{fruit_labels[predicted_class]}: {confidence:.2f}"
    else:
        label = "No fruit detected"

    # Display the prediction on the frame
    cv2.putText(frame, label, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    # Show the frame
    cv2.imshow('Fruit Recognition', frame)

    # Break the loop on 'q' key press
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the camera and close windows
cap.release()
cv2.destroyAllWindows()
