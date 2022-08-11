from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from .ping import Ping
import logging
import traceback

logger = logging.getLogger("django")

class PingAPIViews(views.APIView):

    renderer_classes = [JSONRenderer]

    def get(self, request, *args, **kwargs):
        try:
            if self.kwargs.get('ip') == None:
                return Response('{"code": "2", "result": "Need the target IP."}', status=status.HTTP_400_BAD_REQUEST)
            ping = Ping()
            result = ping.sendpacket(self.kwargs.get('ip'))
            logger.error(result)
            return Response(result, status=status.HTTP_200_OK)
        except:
            logger.error(traceback.format_exc())
            return Response('{"code": "1", "result": "Runtime error."}', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
