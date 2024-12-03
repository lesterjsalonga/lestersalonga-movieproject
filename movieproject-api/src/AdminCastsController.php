<?php
class AdminCastsController
{
    public function __construct(private AdminCastsGateway $gateway, private Auth $auth)
    {
    }

    public function processRequest(string $method, ?string $id): void
    {
        if (isset($id)) {
            $this->processResourceRequest($method, $id);
        } else {
            $this->processCollectionRequest($method);
        }
    }

    private function processResourceRequest(string $method, string $id): void
    {
        $cast = $this->gateway->get($id);
        if (!$cast) {
            http_response_code(404); // Not Found
            echo json_encode(["message" => "Cast not found"]);
            return;
        }

        switch ($method) {
            case "GET":
                echo json_encode($cast);
                break;

            case "PATCH":
                $data = json_decode(file_get_contents("php://input"), true);
                if (!$data) {
                    http_response_code(400); // Bad Request
                    echo json_encode(["message" => "Invalid JSON format"]);
                    return;
                }

                $errors = $this->getValidationErrors($data, false);
                if (!empty($errors)) {
                    http_response_code(422); // Unprocessable Entity
                    echo json_encode(["errors" => $errors]);
                    return;
                }

                $rows = $this->gateway->update($cast, $data);
                echo json_encode([
                    "message" => "Cast $id updated.",
                    "rows" => $rows
                ]);
                break;

            case "DELETE":
                $rows = $this->gateway->delete($id, $this->auth->getUserID());
                echo json_encode([
                    "message" => "Cast $id deleted",
                    "rows" => $rows
                ]);
                break;

            default:
                http_response_code(405); // Method Not Allowed
                header("Allow: GET, PATCH, DELETE");
                break;
        }
    }

    private function processCollectionRequest(string $method): void
    {
        switch ($method) {
            case "GET":
                echo json_encode($this->gateway->getAll());
                break;

            case "POST":
                $data = json_decode(file_get_contents("php://input"), true);
                if (!$data) {
                    http_response_code(400); // Bad Request
                    echo json_encode(["message" => "Invalid JSON format"]);
                    return;
                }

                $errors = $this->getValidationErrors($data, true);
                if (!empty($errors)) {
                    http_response_code(422); // Unprocessable Entity
                    echo json_encode(["errors" => $errors]);
                    return;
                }

                $data['userId'] = $this->auth->getUserID();
                $id = $this->gateway->create($data);

                http_response_code(201); // Created
                echo json_encode([
                    "message" => "Cast created",
                    "id" => $id
                ]);
                break;

            default:
                http_response_code(405); // Method Not Allowed
                header("Allow: GET, POST");
                break;
        }
    }

    private function getValidationErrors(array $data, bool $is_new = true): array
    {
        $errors = [];
        if ($is_new && empty($data["movieId"])) {
            $errors[] = "Movie ID is required.";
        }

        if ($is_new && empty($data["name"])) {
            $errors[] = "Name is required.";
        }

        if ($is_new && empty($data["url"])) {
            $errors[] = "Photo URL is required.";
        }

        if ($is_new && empty($data["characterName"])) {
            $errors[] = "Character Name is required.";
        }

        return $errors;
    }
}