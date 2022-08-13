from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
import logging
import traceback
import os
from utils.net import Net

logger = logging.getLogger("django")

class InterfaceListAPIViews(views.APIView):

    renderer_classes = [JSONRenderer]

    def get(self, request, *args, **kwargs):
        iface_dir = '/sys/class/net'
        try:
            result = os.listdir(iface_dir)
            return Response(result, status=status.HTTP_200_OK)
        except:
            logger.error(traceback.format_exc())
            return Response('{"code": "1", "result": "Runtime error."}', status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class InterfaceInfoAPIViews(views.APIView):

    renderer_classes = [JSONRenderer]

    def get(self, request, *args, **kwargs):
        try:
            if self.kwargs.get('interface') == None:
                return Response('{"code": "2", "result": "Need the NIC name."}', status=status.HTTP_400_BAD_REQUEST)
            result = dict()
            info = Net.get_ip_from_if(self.kwargs.get('interface'))
            return Response(result, status=status.HTTP_200_OK)
        except:
            logger.error(traceback.format_exc())
            return Response('{"code": "1", "result": "Runtime error."}', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
