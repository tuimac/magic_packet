from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from .arp import Arp
import logging
import traceback

logger = logging.getLogger("django")

class ArpAPIViews(views.APIView):

    renderer_classes = [JSONRenderer]

    def get(self, request, *args, **kwargs):
        try:
            if self.kwargs.get('macaddr') == None:
                return Response('{"code": "2", "result": "Need the target IP."}', status=status.HTTP_400_BAD_REQUEST)
            arp = Arp()
            result = dict()
            if self.kwargs.get('macaddr') == None:
                result = arp.ping()
                logger.error(result)
            else:
                result = arp.ping(ip=self.kwargs.get('ip'))
                logger.error(result)
            return Response(result, status=status.HTTP_200_OK)
        except:
            logger.error(traceback.format_exc())
            return Response('{"result": "Runtime error."}', status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ArpScanAPIViews(views.APIView):

    renderer_classes = [JSONRenderer]

    def get(self, request, *args, **kwargs):
        try:
            arp = Arp()
            result = dict()
            result = arp.scanAll()
            return Response(result, status=status.HTTP_200_OK)
        except:
            logger.error(traceback.format_exc())
            return Response('{"result": "Runtime error."}', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
