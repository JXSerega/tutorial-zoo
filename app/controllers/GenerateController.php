<?php

class GenerateController extends BaseController {

    /**
     * @param int $count
     * @return \Illuminate\Http\JsonResponse
     * @throws Exception
     */
    public function animals($count){
        $count = (int) $count;

        if (!$count || $count > 1000000) {
            throw new Exception('Animal generate invalid count');
        }

        try {
            (new AnimalsSeeder())->run($count);
        } catch (Exception $e) {
            echo json_encode($e);
            throw $e;
        }

        return Response::json([
            'created' => $count
        ]);
    }

}