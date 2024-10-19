import cv2
import numpy as np
from keras.models import load_model
from keras.applications.resnet50 import preprocess_input
import os

# Load the saved model
model = load_model('neural/fruit_recognition_model.keras')

# Load class names
class_names = sorted(os.listdir('input/fruits/Training'))

# Initialize the webcam
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()

    # Resize and preprocess the frame
    resized_frame = cv2.resize(frame, (100, 100))
    img_array = np.expand_dims(resized_frame, axis=0)
    img_array = preprocess_input(img_array)

    # Make predictions
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions, axis=1)[0]
    predicted_label = class_names[predicted_class]

    # Display the prediction
    cv2.putText(frame, f'Prediction: {predicted_label}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
    cv2.imshow('Fruit Recognition', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
